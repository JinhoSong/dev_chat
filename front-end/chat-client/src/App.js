import React from 'react';
import './App.css';
import ChatRooms from './components/chatRoom/ChatRooms';
import RouterComponent from './RouterComponent';
class App extends React.Component {


    render() {
        return (
            <div>
                <RouterComponent/>
            </div>
        );
    }
}

export default App;