import {createAction, handleActions} from "redux-actions";

const SETROOMID = 'chatRooms/SETROOMID';
const SETROOMNAME = 'chatRooms/SETROOMNAME';
const SETROOMINFO = 'chatRooms/SETROOMINFO';

export const setRoomId = createAction(SETROOMID, roomId => ({roomId}));
export const setRoomName = createAction(SETROOMNAME, roomName => ({roomName}));
export const setRoomInfo = createAction(SETROOMINFO, roomInfo => ({roomInfo}));
const initialState = {
    roomId: "aa",
    username: "user",
    roomName: "",
    tag: "",

};
const chatRooms = handleActions({
        [SETROOMID]: (state, {payload: roomId}) => ({...state, ...state.roomId = roomId}),
        [SETROOMNAME]: (state, {payload: roomName}) => ({...state, ...state.roomName = roomName}),
        [SETROOMINFO]: (state, {payload: roomInfo}) => ({
            ...state = roomInfo
        }),
    },
    initialState,
);

export default chatRooms;