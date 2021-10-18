const express = require('express')
const app = express()
const Wsocet = require('express-ws')(app)
const aWss = Wsocet.getWss()
const path = require('path')
const port = process.env.PORT || 5000


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.ws('/api', (ws, res) =>{
    ws.on('message', (msg)=>{
        msg = JSON.parse(msg)
        console.log(msg)
        switch (msg.method){
            case "connect":
                connectionHandler(ws, msg)
                break
            default:
                broadcastConnection(ws, msg)
                break
        }
    })
})

app.listen(port,() => console.log(`Server start on port: ${port}`))

connectionHandler = (ws, msg) =>{
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg)=>{
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}