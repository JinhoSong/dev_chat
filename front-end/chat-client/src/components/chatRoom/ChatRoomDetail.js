import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {MessageBox, SystemMessage} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import './messageRoom.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import SockJsClient from 'react-stomp';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import ApiService from "../../ApiService";

const ChatRoomDetail = ({setSessionId, roomId, username, user, roomName, tag, sessionId}) => {
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    const $webSocket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState({});
    const [inputMessage, setInputMessage] = useState("");
    //const [sessionId,setSessionId] = useState("");
    const [attendState, setAttendState] = useState(false); // 초기값 지정
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    let sockJS = new SockJS("http://localhost:8080/ws-stomp");
    let stompClient = Stomp.over(sockJS);

    const scrollToBottom = () => {

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        // 스크롤 이벤트 처리

    }; // 한번만 실행

    useEffect(() => {
        scrollToBottom();
        // 메시지의 변화가 있을 때 마다 스크롤을 변화시킨다.
    }, [messages]);
    useEffect(
        () => {
            ApiService.getSessionId(roomId).then(response => {
                setSessionId(response.data)
            });
        }, []);
    useEffect(() => {
        // 초기 입장시에만 프로토콜을 보낸다.
        const enterMessage = {
            "id": "",
            "user": user,
            "messageType": "ENTER",
            "message": "",
            "roomId": roomId,
            "time": sendTime(),
            "sessionId": sessionId, //보낼때의 세션 아이디
        };
        stompClient.connect({}, () => {
            stompClient.subscribe('/pub/chat/roomId/'+roomId, onMessageReceive);
            stompClient.send("/pub/chat/message", {}, JSON.stringify(enterMessage));
        });
    }, []);

    function sendTime() {
        const date = new Date();
        const hours = ((date.getHours() < 12) ? "오전 " + date.getHours() : "오후 " + (date.getHours() - 12).toString()) + "시 ";
        const minutes = ((date.getMinutes() > 9) ? +date.getMinutes() : +"0" + date.getMinutes()) + "분";
        return hours + minutes;
    }

    function sendMessage(msg) {
        // 가공된 메시지를 서버로 보내는 함수.
        $webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(msg));
    }

    const addMessage = (msg) => {
        setMessages([
            ...messages,
            {
                "id": msg.id,
                "user": msg.user,
                "messageType": msg.messageType,
                "message": msg.message,
                "roomId": msg.roomId,
                "time": msg.time,
                "sessionId": msg.sessionId,
            }

        ]);
    };
    // 메시지를 받는 곳
    // 여기서 필터링 작업을 수행하면 된다.
    const onMessageReceive = (msg) => {
        if(msg.messageType === null)
            msg = JSON.parse(msg);
        console.log(msg.messageType);
        if (msg.messageType === "ATTEND") {
            if (user.role === "student") {
                // 학생일 경우
                let result = window.confirm("출석확인 알람이 도착하였습니다! ");
                if (result) {
                    // 성공시
                    console.log(msg);
                    const attendMessage = {
                        "id": "",
                        "user": user,
                        "messageType": "ATTEND",
                        "message": msg.message, // 요청이 날라온 시간이 담긴 메시지를 그대로 보낸다.
                        "roomId": roomId,
                        "time": sendTime(), // 현재 시간도 세팅한다.
                        "sessionId": sessionId,
                    }
                    sendMessage(attendMessage);
                }
            }
        } else if(msg.messageType ==="DELETE"){
            // 삭제의 경우
            //        const filterBox = commentBox.filter((comment) => comment.id !== Number(event.target.className))
            let m = messages;
            const tmp = m.filter((message) => message.id !== msg.id); // 조건을 만족하는 배열 리턴
            setMessages(tmp);
        }else {
            addMessage(msg);
        }
    }

    const settingMessage = (msg) => {
        if (msg[0] === '/') {
            switch (msg) {
                case "/출석":
                    if (user.role === "professor") {
                        //교수만 사인을 보낼 수 있다.
                        return {
                            "id": "",
                            "user": user,
                            "messageType": "ATTEND",
                            "message": msg,
                            "roomId": roomId,
                            "time": sendTime(),
                            "sessionId": sessionId,
                        };
                    } else {
                        // 본인 출석 여부 확인하는데 이용
                        return {
                            "user": user,
                            "messageType": "TALK",
                            "message": msg,
                            "roomId": roomId,
                            "time": sendTime(),
                            "sessionId": sessionId,
                        };
                    }
            }
        } else {
            // 그냥 채팅이다.
            return {
                "id": "",
                "user": user,
                "messageType": "TALK",
                "message": msg,
                "roomId": roomId,
                "time": sendTime(),
                "sessionId": sessionId,
            };
        }
        // 커맨드 명령을 나눌 곳
    };

    function renderMessages(message) {
        const position = message.user.studentId === user.studentId;

        function deleteProtocol() {
            const deleteMessage = {
                "id": message.id,
                "user": message.user,
                "messageType": "DELETE",
                "message": message.message, // 요청이 날라온 시간이 담긴 메시지를 그대로 보낸다.
                "roomId": roomId,
                "time": sendTime(), // 현재 시간도 세팅한다.
                "sessionId": sessionId,
            }
            sendMessage(deleteMessage);
            console.log(deleteMessage);
            console.log("메시지 삭제 프로토콜 전송");
        }

        function elseClick() {

        }

        switch (message.messageType) {
            case "ENTER":
                if (message.user.name !== user.name) {
                    return (
                        <div>
                            <SystemMessage
                                text={message.message}/>
                        </div>
                    );
                }
                break;
            case "ANSWER": // 출석에 대한 대답이 온 경우
                let result;
                if (user.role === "professor") {
                    result = message.user.name + " 학생 " + message.message;
                } else {
                    result = message.message;
                }
                return (
                    <div>
                        <SystemMessage
                            text={result}/>
                    </div>
                )
            case "TALK":
                return (
                    <div>
                        <MessageBox
                            position={position ? 'right' : 'left'}
                            type={'text'}
                            text={message.message}
                            title={position ? null : message.sender}
                            replyButton={position}
                            onReplyClick={position ? deleteProtocol : elseClick}
                            dateString={message.time}
                        />
                    </div>
                );
            case "DELETE":
                console.log(message.message + "삭제");
        }
    }

    return (
        <div>
            <SockJsClient
                url="http://localhost:8080/ws-stomp"
                topics={['/pub/', '/sub/', `/sub/chat/room/${roomId}`, '/pub/', '/sub/', `/sub/chat/sessionId/${sessionId}`]} // `` 조심하자 ㅠ
                ref={$webSocket}
                onMessage={onMessageReceive}
                style={[{width: '100%', height: '100%'}]}
            />
            <div className="room" ref={scrollRef}>
                {messages.map(m => renderMessages(m))}
            </div>
            <form>
                <input hidden="hidden"/>
                <input
                    className="textInput"
                    type="message"
                    onKeyPress={function (e) {
                        if (e.key === "Enter") {
                            const msg = settingMessage(inputMessage);
                            sendMessage(msg);
                            setInputMessage("");
                        }
                    }}
                    ref={inputRef}
                    value={inputMessage}
                    onChange={function (e) {
                        setInputMessage(e.target.value);
                    }}
                    placeholder="메시지를 입력하세요!"/>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="small"
                    type="button" //안하면 submit되서 리다이렉트 시켜버린다. 주의!
                    onClick={function () {
                        const msg = settingMessage(inputMessage);
                        sendMessage(msg);
                        setInputMessage("");
                    }}>전송
                </Button>

            </form>

        </div>
    );

}


export default connect(
    state => ({
        roomId: state.chatRooms.roomInfo.roomId,
        roomName: state.chatRooms.roomInfo.roomName,
        tag: state.chatRooms.roomInfo.tag,
        username: state.chatRooms.username,
        user: state.loginModules.user,
        sessionId: state.chatRooms.sessionId,
    }),
)(ChatRoomDetail);