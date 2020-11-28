import {createAction, handleActions} from "redux-actions";

const SETUSERNAME = 'loginModules/SETUSERNAME';
const SETAUTHENTICATION = 'loginModules/SETAUTHENTICATION';
const LOGOUT = 'loginModules/LOGOUT';
const SETTINGUSER = 'loginModules/SETTINGUSER';


export const setUsername = createAction(SETUSERNAME, username => ({username}));
export const setAuthentication = createAction(SETAUTHENTICATION, authentication => ({authentication}));
export const logout = createAction(LOGOUT);

export const settingUser = createAction(SETTINGUSER, user => ({user}))

const initialState = {
    user : {
        name: "test",
        authentication: false,
        role: "",
    },
};
const loginModules = handleActions({
        [SETUSERNAME]: (state, {payload: username}) => ({...state, ...state.username = username}),
        [SETAUTHENTICATION]: (state, {payload: authentication}) => ({...state, ...state.authentication = authentication}),
        [LOGOUT]: (state) => ({...state, ...state.authentication = false, ...state.username = ""}),
        [SETTINGUSER]: (state, {payload: user}) => ({
            ...state=user,
            // 유저 정보를 한번에 가져온다.
        }),
    },
    initialState,
);

export default loginModules;