import React, {useState} from 'react';
import {connect} from 'react-redux';
import { settingUser} from '../modules/loginModules';
import LoginForm from "../components/login/LoginForm";
import {signIn} from "../components/login/Auth";

const ChatRoomContainer = ({settingUser}) => {

    // 인증용
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const authenticated = user != null;

    const login = ({ name, password }) => setUser(signIn({ name, password,settingUser }));
    return (
        <div>
            <LoginForm authenticated={authenticated} login={login} settingUser={settingUser}  location={location}/>
        </div>
    );
};

export default connect(
    state => ({

    }),
    {
        settingUser,
    },
)(ChatRoomContainer);