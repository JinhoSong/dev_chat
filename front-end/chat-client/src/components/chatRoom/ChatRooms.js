import React, {useState, useEffect} from "react";
import ApiService from "../../ApiService";
import {Link,Route} from "react-router-dom";
import ChatRoomDetail from "./ChatRoomDetail";

const ChatRooms = ({setRoomId, setUsername}) => {
    const [chatRooms, setChatRooms] = useState([]);
    useEffect(
        () => {
            ApiService.getChatRooms().then(response => {
                setChatRooms(response.data);
            });
        }, []);
    function roomList(info){
        return (

            <div>
                <Link to={`/chat/room/enter/${info}`}>{info}</Link>
                <br/>
            </div>

        )
    }
    return (
        <div>
            <div>{chatRooms.map((roomInfo) => <p onClick={() => setRoomId(roomInfo.roomId)}>{roomList(roomInfo.roomId)}</p>)}</div>
        </div>
    )
}

export default ChatRooms;