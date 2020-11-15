import React, {useState, useRef,useEffect} from 'react';
import {connect} from "react-redux";
import SockJsClient from "react-stomp";
import Fetch from "json-fetch";
import {TalkBox} from "react-talk";

const ChatRoomDetail = ({roomId}) => {
    const $webSocket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState({});
    useEffect(() => {
      //  console.log(chatMessage);
        //handleClickSendTo(chatMessage);
    },[]);
    const addMessage = (msg) => {
        setMessages([
            ...messages,
            {
                "author": msg.sender,
                "messageType": msg.messageType,
                "message": msg.message,
                "roomId": msg.roomId,
            }
        ]);

         //console.log(messages);
    };
    const onMessageReceive = (msg) => {
        addMessage(msg);
    }

    const settingChatMessage = (msg) => {
        setChatMessage({
            "sender": "나중에 로그인",
            "messageType": "TALK",
            "message": msg,
            "roomId": roomId,
        });

    };

    const handleClickSendTo = (msg) => {
        //$webSocket.current.sendMessage('/chat/message',chatMessage);
        settingChatMessage(msg);
        const testMessage= {
            "sender": "나중에 로그인",
            "messageType": "TALK",
            "message": msg,
            "roomId": roomId,
        }

        $webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(testMessage));

    };
    console.log("함수밖에서 찍은거 ");
    console.log(chatMessage);

    return (
        <div>
            <TalkBox topic={"네트워크 A반"}
                     currentUserId={chatMessage.sender}
                     currentUser={messages}
                     messages={messages}
                     onSendMessage={handleClickSendTo}
                     connected={$webSocket}/>

            <SockJsClient
                url="http://localhost:8080/ws-stomp"
                topics={['/pub/', '/sub/', `/sub/chat/room/${roomId}`]} // `` 조심하자 ㅠ
                ref={$webSocket}
                onMessage={onMessageReceive}
                style={[{width: '100%', height: '100%'}]}
            />
        </div>
    );

}

export default connect(
    state => ({
        roomId: state.chatRooms.roomId,
    }),
)(ChatRoomDetail);