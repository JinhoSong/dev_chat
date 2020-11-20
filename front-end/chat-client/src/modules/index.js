import {combineReducers} from "redux";
import chatRooms from './chatRooms';
import loginModules from "./loginModules";

const rootReducer = combineReducers({
    chatRooms,
    loginModules,
});

export default rootReducer;