import {createAction, handleActions} from "redux-actions";

const SETROOMID = 'chatRooms/SETROOMID';
const SETUSERNAME = 'chatRooms/SETUSERNAME';


export const setRoomId = createAction(SETROOMID,roomId =>({roomId}));
export const setUsername = createAction(SETUSERNAME,username =>({username}));

const initialState = {
    id:1,
    roomId: "aa",
    username: "user",
};
const chatRooms = handleActions({
        [SETROOMID] : (state,{payload : roomId}) => ({...state.roomId = roomId}),
        [SETUSERNAME] : (state,{payload : username}) => ({...state.username = username + " "+state.id++}),
    },
    initialState,
);

export default chatRooms;