import {makeAutoObservable} from "mobx";

class GlobalState{
    /*TODO
    *  Сделать клинт-сервер соединение*/


    player = null
    videoPlayer = null
    username = null
    source = null
    sessionId = null
    socket = null

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(Socket){
        this.socket = Socket
    }

    setVideoPlayer(Video){
        this.videoPlayer = Video
    }

    setPlayer(Player){
        this.player = Player
    }

    setSessionId(ID){
        this.sessionId = ID
    }

    setName(User){
        this.username = User
    }

    setSource(Source){
        this.source = Source
    }

}

export default new GlobalState()