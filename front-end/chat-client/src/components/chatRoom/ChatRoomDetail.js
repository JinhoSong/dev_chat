import React, {useState, useRef, useEffect} from 'react';
import {connect} from "react-redux";
import SockJsClient from "react-stomp";
import {TalkBox} from "react-talk";

const ChatRoomDetail = ({roomId,username}) => {
    const $webSocket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState({});
    useEffect(() => {
        const enterMessage = {
            "sender": "처음 로그인",
            "messageType": "ENTER",
            "message": "",
            "roomId": roomId,
        };
        //$webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(enterMessage));
    }, []);
    const addMessage = (msg) => {
        setMessages([
            ...messages,
            {
                "author": msg.sender, // 이건 변수 맞춰줘야 되니까 author로 설정해둔것 주고 받을때는 sender로 오는게 맞다.
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
            const result = window.confirm("출석 알림이 도착하였습니다!");
            //alert("테스트");

            if (result) {
                // 성공시
                const talk = {
                    "sender": messages.sender,
                    "messageType": "",
                    "message": "",
                    "roomId": roomId,
                }
                $webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(talk));
            }


            console.log("ENTER 확인" + result);
        }
    }

    const settingChatMessage = (msg) => {
        const talkMessage = {
            "sender": "나중에 로그인",
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
        alert(username)
        const attend = {
            "sender": username,
            "message": "출석용 프로토콜",
            "messageType": "ATTEND",
            "roomId": roomId
        }
        $webSocket.current.sendMessage('/pub/chat/message', JSON.stringify(attend));

    }

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
            <button onClick={attend}>출석용 버튼</button>
        </div>
    );

}


export default connect(
    state => ({
        roomId: state.chatRooms.roomId,
        username: state.chatRooms.username,
    }),
)(ChatRoomDetail);