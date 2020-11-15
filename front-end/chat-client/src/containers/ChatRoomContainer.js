import React from 'react';
import ChatRooms from "../components/chatRoom/ChatRooms";
import {connect} from 'react-redux';
import {setRoomId, setUsername} from '../modules/chatRooms';

const ChatRoomContainer = ({setRoomId,setUsername}) => {
    return (
        <div>
            <ChatRooms setRoomId={setRoomId} setUsername={setUsername}/>
        </div>
    );
};

export default connect(
    state => ({
        roomId: state.chatRooms.roomId,
    }),
    {
        setRoomId,
        setUsername
    },
)(ChatRoomContainer);