import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import GlobalState from "../store/GlobalState";
import PlayerController from "../store/PlayerController";
import {observer} from "mobx-react-lite";

const ModalWindow = observer(() => {

    const username = useRef()
    const sessionId = useRef()
    const [modal, setModal] = useState(true)

    const nameset = () =>{
        GlobalState.setName(username.current.value)
        GlobalState.setSessionId(sessionId.current.value)
        setModal(false)
    }

    useEffect(() =>{
        if(GlobalState.sessionId && GlobalState.username){
            const socket = new WebSocket(`ws://localhost:5000/api`)
            GlobalState.setSocket(socket)
            GlobalState.setPlayer(new PlayerController(GlobalState.videoPlayer, socket, GlobalState.sessionId))
            socket.onopen = () =>{
                socket.send(JSON.stringify({
                    method: "connect",
                    id: GlobalState.sessionId,
                    username: GlobalState.username
                }))
            }
            socket.onmessage = (event) =>{
                let msg = JSON.parse(event.data)
                switch (msg.method){
                    case "connect":
                        console.log(`Пользователь ${msg.username} присоединился`)
                        break
                    case "source_change":
                        console.log(msg)
                        GlobalState.player.changeSourse(msg.source)
                        break
                    case "PlayStop":
                        GlobalState.player.PlayStop(msg.play)
                        break
                    case "seeker":
                        GlobalState.player.icurrentTime(msg.time)
                        break
                    default:
                        console.log(msg)
                        break
                }
            }
        }
    })

    return (
        <div>
            <Modal show={modal} onHide={() => {}}>
                <Modal.Body>
                    <h5>Введите UserName</h5>
                    <input ref={username} type="text"/>
                    <h5>Введите ID сессии</h5>
                    <input ref={sessionId} type="text"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={nameset}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default ModalWindow;