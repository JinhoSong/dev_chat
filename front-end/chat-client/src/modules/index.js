import {combineReducers} from "redux";
import chatRooms from './chatRooms';

const rootReducer = combineReducers({
    chatRooms,
});

export default rootReducer;