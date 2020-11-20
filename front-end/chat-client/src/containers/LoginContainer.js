import React, {useState} from 'react';
import {connect} from 'react-redux';
import { setUsername,setAuthentication} from '../modules/loginModules';
import LoginForm from "../components/login/LoginForm";
import {signIn} from "../components/login/Auth";

const ChatRoomContainer = ({setUsername,setAuthentication}) => {

    // 인증용
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const authenticated = user != null;

    const login = ({ name, password }) => setUser(signIn({ name, password }));
    return (
        <div>
            <LoginForm authenticated={authenticated} login={login} setUsername={setUsername} setAuthentication={setAuthentication} location={location} />
        </div>
    );
};

export default connect(
    state => ({

    }),
    {
        setUsername,
        setAuthentication,
    },
)(ChatRoomContainer);