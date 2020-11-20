import React, {useState, useEffect} from "react";
import ApiService from "../../ApiService";
import {Link, Route} from "react-router-dom";

const ChatRooms = ({setRoomId, setRoomName}) => {
    const [chatRooms, setChatRooms] = useState([]);
    useEffect(
        () => {
            ApiService.getChatRooms().then(response => {
                setChatRooms(response.data);
            });
        }, []);

    function createRoom () {
        ApiService.createChatRooms("123").then(response => {
            setChatRooms(response.data);
        });
    }


    function roomList(roomName) {
        return (
            <div>
                <Link to={`/chat/room/enter/${roomName}`}>{roomName}</Link>
                <br/>
            </div>
        )
    }

    return (
        <div>
            <button onClick={() => createRoom()}>방 생성 버튼 </button>

            <div>{chatRooms.map((roomInfo) => <p onClick={() => {
                setRoomId(roomInfo.roomId);
                setRoomName(roomInfo.roomName);
            }}>{roomList(roomInfo.roomName)}</p>)}</div>
        </div>
    )
}

export default ChatRooms;