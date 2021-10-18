import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Row} from "react-bootstrap";
import GlobalState from "../store/GlobalState";

const VideoPlayer = observer(() => {

    /*TODO
        СДЕЛАТЬ ВИДЕО ПЛЕЕР НА ВЕСЬ ЭКРАН
        Добавить онимешных дэвочек ｡◕‿‿◕｡
     */

    const player = useRef()

    useEffect(() =>{
        GlobalState.setVideoPlayer(player.current)
    })

    return (
        <div>
            <Container fluid="md">
                <Row>
                    <Col className="offset-md-3">
                        <video
                            className="VideoPlayer"
                            ref={player}
                            src={GlobalState.source}
                            width={650}
                            controls
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default VideoPlayer;