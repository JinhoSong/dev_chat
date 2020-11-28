import React from 'react';
import ChatRooms from "../components/chatRoom/ChatRooms";
import {connect} from 'react-redux';
import chatRooms, {setRoomId, setRoomName, setRoomInfo} from '../modules/chatRooms';
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Header from '../components/common/Header'
import UserInfo from "../components/common/UserInfo";
const ChatRoomListContainer = ({setRoomId, setRoomName, setRoomInfo, user}) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Header title={"ChatRoomList"}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Grid container spacing={2}>
                        <Grid container item xs={12}>
                            <Grid item xs={8}>
                                <ChatRooms setRoomInfo={setRoomInfo} setRoomId={setRoomId} setRoomName={setRoomName}/>
                            </Grid>
                            <Grid item xs={1}>

                            </Grid>
                            <Grid item xs={2}>
                               <UserInfo user={user}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default connect(
    state => ({
        roomId: state.chatRooms.roomId,
        roomName: state.chatRooms.roomName,
        user: state.loginModules.user,
    }),
    {
        setRoomId,
        setRoomName,
        setRoomInfo
    },
)(ChatRoomListContainer);