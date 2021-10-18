import React, { useState} from 'react';
import {Button, Container, Form, Navbar} from 'react-bootstrap'
import GlobalState from "../store/GlobalState";
import {observer} from "mobx-react-lite";

const SearchBar = observer(() => {

    /*TODO
    *  Сделать так чтобы при вводе данных в textbox появлялась кнопка,
    *  а при их отсутствии она была hidden
    * */

    const [textbox, setTextbox] = useState("Введите ссылку на видео")

    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container className="justify-content-center">
                    <Form.Control onClick={() => setTextbox("")} onChange={(e) => setTextbox(e.target.value)} value={textbox} className="maintext" type="text"/>
                    <Button
                        className="mainbutton"
                        onClick={() => {
                            GlobalState.setSource(textbox)
                            GlobalState.socket.send(JSON.stringify({
                                method: "source_change",
                                id: GlobalState.sessionId,
                                source: GlobalState.source
                            }))
                        }}
                    >Разослать</Button>
                </Container>
            </Navbar>
        </div>
    );
});

export default SearchBar;