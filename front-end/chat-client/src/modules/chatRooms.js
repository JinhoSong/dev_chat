import {createAction, handleActions} from "redux-actions";

const SETROOMINFO = 'chatRooms/SETROOMINFO';
const SETSESSIONID = 'chatRooms/SETSESSIONID';


export const setRoomInfo = createAction(SETROOMINFO, roomInfo => ({roomInfo}));
export const setSessionId = createAction(SETSESSIONID, sessionId => ({sessionId}));
const initialState = {
    "sessionId":"",
    "roomInfo": [{

    }]
};
const chatRooms = handleActions({

        [SETROOMINFO]: (state, {payload: roomInfo}) => ({
            ...state = roomInfo
        }),
        [SETSESSIONID]: (state, {payload: sessionId}) => ({
            ...state,
            ...state.sessionId = sessionId,
        }),
    },
    initialState,
);

export default chatRooms;