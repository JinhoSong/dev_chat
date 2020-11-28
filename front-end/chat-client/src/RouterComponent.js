import React,{useState} from "react";
import { BrowserRouter , Route, Switch,Link } from "react-router-dom";
import ChatRoomDetail from "./components/chatRoom/ChatRoomDetail";
import ChatRoomListContainer from './containers/ChatRoomListContainer';
import ChatRoomContainer from './containers/ChatRoomContainer';
import AuthRoute from "./components/login/AuthRoute";
import LoginContainer from "./containers/LoginContainer";
import { signIn } from './components/login/Auth';

const AppRouter = () => {
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const authenticated = user != null;
    // 무한으로 redirect 되는걸 막기 위해 가장 최상단에 /login을 배치한다.
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Switch>
                        <Route
                            path="/login"
                            render={props => (
                                <LoginContainer />
                                )}
                        />
                        <Route path="/chat/room/enter/" component={ChatRoomContainer}/>
                        <AuthRoute
                            authenticated={authenticated}
                            path="/"
                            render={props => <ChatRoomListContainer user={user} {...props} />}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

const style = {
    margin: "10px",
};

export default AppRouter;
