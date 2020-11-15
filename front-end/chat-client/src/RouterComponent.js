import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoomDetail from "./components/chatRoom/ChatRoomDetail";
import ChatRooms from "./components/chatRoom/ChatRooms";
import ChatRoomContainer from './containers/ChatRoomContainer';
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Switch>
                        <Route exact path="/" component={ChatRoomContainer} />
                        <Route path="/chat/room/enter/" component={ChatRoomDetail}/>
                        <Route path="/chat/room/enter/:roomId"  component={ChatRoomDetail}/>

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
