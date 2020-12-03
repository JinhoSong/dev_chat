import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {MessageBox} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import './messageRoom.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoomDetail = ({roomId, username, user, roomName, tag}) => {
    const $webSocket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState({});
    const scrollRef = useRef(null);

    let sockJS = new SockJS("http://localhost:8080/ws-stomp");
    let stompClient = Stomp.over(sockJS);
    stompClient.debug= () => {};

    const scrollToBottom = () => {
        // scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }; // 한번만 실행

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // 초기 입장시에만 프로토콜을 보낸다.
        const enterMessage = {
            "sender": user.name,
            "messageType": "ENTER",
            "message": "",
            "roomId": roomId,
            "time": sendTime(),
        };
        sendMessage(enterMessage);
    }, []);

    function sendTime() {
        const date = new Date();
        return ((date.getHours() < 12) ? "오전 " + date.getHours() : "오후 " + (date.getHours() - 12).toString()) + "시 " + date.getMinutes() + "분";
    }

    function sendMessage(msg) {
        // 가공된 메시지를 서버로 보내는 함수.
        console.log(msg);
        console.log(stompClient);
        stompClient.connect({},()=>{
            stompClient.subscribe('/pub/chat/message');
            stompClient.send("/pub/chat/message",{},JSON.stringify(msg));
        });
        console.log(stompClient);

    }
    const addMessage = (msg) => {
        setMessages([
            ...messages,
            {
                "sender": msg.sender, // 이건 변수 맞춰줘야 되니까 author로 설정해둔것 주고 받을때는 sender로 오는게 맞다.
                "messageType": msg.messageType,
                "message": msg.message,
                "roomId": msg.roomId,
            }
        ]);

        //console.log(messages);
    };
    // 메시지를 받는 곳
    // 여기서 필터링 작업을 수행하면 된다.

    const onMessageReceive = (msg) => {
        addMessage(msg);
        if (msg.messageType === "ENTER") {
            const result = window.confirm("누군가 입장하였습니다.");
            if (result) {
                // 성공시
                const talk = {
                    "sender": messages.sender,
                    "messageType": "TALK",
                    "message": "출석성공",
                    "roomId": roomId,
                }
                //$webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(talk));
            }
        }
    }

    const settingChatMessage = (msg) => {
        const talkMessage = {
            "sender": user.name,
            "messageType": "TALK",
            "message": msg,
            "roomId": roomId,
        };
        return talkMessage;
    };

    const handleClickSendTo = (msg) => {
        const talk = settingChatMessage(msg);
        // useState에 저장하면 순서가 꼬인다. return 값을 받아서 사용하도록 하자.
        $webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(talk));
    };

    const attend = () => {
        const attend = {
            "sender": user.name,
            "message": "출석용 프로토콜",
            "messageType": "ATTEND",
            "roomId": roomId
        }

    }


    function renderMessages(message) {
        const position = message.sender === user.name;

        function deleteProtocol() {
            console.log("삭제 프로토콜" + message);
            // 클릭한 메시지를 지워달라는 소켓을 보내면 된다.
        }

        function elseClick() {

        }

        return (
            <div>
                <MessageBox
                    position={position ? 'right' : 'left'}
                    type={'text'}
                    text={message.message}
                    title={message.sender}
                    replyButton={position}
                    onReplyClick={position ? deleteProtocol : elseClick}
                />
            </div>
        )
    }

    return (
        <div>

            <div className="room" ref={scrollRef}>
                {messages.map(m => renderMessages(m))}
            </div>
            <input type="text"/>

            <button onClick={attend}>출석용 버튼</button>
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
    }),
)(ChatRoomDetail);