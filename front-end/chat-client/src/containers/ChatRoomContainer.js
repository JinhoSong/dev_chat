import React from 'react';
import ChatRooms from "../components/chatRoom/ChatRooms";
import {connect} from 'react-redux';
import chatRooms, {setRoomId,setRoomName} from '../modules/chatRooms';

const ChatRoomContainer = ({setRoomId,setRoomName}) => {

    return (
        <div>
            <ChatRooms setRoomId={setRoomId}  setRoomName={setRoomName}/>
        </div>
    );
};

export default connect(
    state => ({
        roomId: state.chatRooms.roomId,
        roomName: state.chatRooms.roomName,
    }),
    {
        setRoomId,
        setRoomName
    },
)(ChatRoomContainer);