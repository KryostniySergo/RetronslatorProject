import GlobalState from "./GlobalState";

export default class PlayerController{
    constructor(player, socket, id) {
        this.player = player
        this.socket = socket
        this.id = id
        this.listen()
    }

    listen(){
        this.player.onpause = this.onPauseHandler.bind(this)
        this.player.onclick = this.onClickHandler.bind(this)
        this.player.onplay = this.onPlayHandler.bind(this)
        this.player.onseeking = this.onseekingHandler.bind(this)
    }

    icurrentTime(time){
        this.player.currentTime = time
        this.player.play()
    }

    changeSourse(sourse){
        GlobalState.source = sourse
    }

    PlayStop(msg){
        if(msg === "play"){
            this.player.play()
        }else{
            this.player.pause()
        }
    }

    onClickHandler(){
        if(this.player.paused){
            this.socket.send(JSON.stringify({
                method: "PlayStop",
                id: this.id,
                play: "play"
            }))
        }else{
            this.socket.send(JSON.stringify({
                method: "PlayStop",
                id: this.id,
                play: "stop"
            }))
        }
    }

    onPlayHandler(){
        console.log("I Play")
    }

    onPauseHandler(){
        console.log("I pause")
    }

    onseekingHandler(){
        console.log("Должен сработать seeker")
        if(this.player.paused) {
            this.socket.send(JSON.stringify({
                method: "seeker",
                id: this.id,
                time: this.player.currentTime
            }))
        }
    }
}