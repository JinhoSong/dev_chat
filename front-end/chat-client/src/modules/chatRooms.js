import {createAction, handleActions} from "redux-actions";

const SETROOMID = 'chatRooms/SETROOMID';
const SETROOMNAME = 'chatRooms/SETROOMNAME';


export const setRoomId = createAction(SETROOMID, roomId => ({roomId}));
export const setRoomName = createAction(SETROOMNAME, roomName => ({roomName}));

const initialState = {
    id: 1,
    roomId: "aa",
    username: "user",
    roomName: "",
};
const chatRooms = handleActions({
        [SETROOMID]: (state, {payload: roomId}) => ({...state,...state.roomId = roomId}),
        [SETROOMNAME] : (state, {payload: roomName}) => ({ ...state, ...state.roomName = roomName}),
    },
    initialState,
);

export default chatRooms;