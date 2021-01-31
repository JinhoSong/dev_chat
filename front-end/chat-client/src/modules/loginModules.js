import {createAction, handleActions} from "redux-actions";

const LOGOUT = 'loginModules/LOGOUT';
const SETTINGUSER = 'loginModules/SETTINGUSER';

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
        [LOGOUT]: (state) => ({...state, ...state.authentication = false, ...state.username = ""}),
        [SETTINGUSER]: (state, {payload: user}) => ({
            ...state=user,
            // 유저 정보를 한번에 가져온다.
        }),
    },
    initialState,
);

export default loginModules;