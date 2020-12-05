import React, {useState, useEffect} from "react";
import ApiService from "../../ApiService";
import {Link, Route} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    {id: '과목명', label: '과목명', minWidth: 170},
    {id: '분반', label: '분반', minWidth: 70},
    {id: '교수', label: '교수', minWidth: 170},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});


const ChatRooms = ({setRoomInfo}) => {
    const [chatRooms, setChatRooms] = useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(
        () => {
            ApiService.getChatRooms().then(response => {
                setChatRooms(response.data);
            });
        }, []);

    function createRoom() {
        ApiService.createChatRooms("네트워크 프로그래밍", "정인환", "B").then(response => {
            setChatRooms(response.data);
        });
    }


    function roomList(roomId, roomName) {
        return (
            <div>
                <Link to={`/chat/room/enter/${roomId}`}>{roomName}</Link>
                <br/>
            </div>
        )
    }

    return (
        <div>
            <h1>입장하실 과목명을 클릭하세요!</h1>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chatRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((roomInfo) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <div>
                                                <div><p onClick={() => {
                                                    setRoomInfo(roomInfo);
                                                }}>{roomList(roomInfo.roomId, roomInfo.roomName)}</p></div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p>{roomInfo.tag}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{roomInfo.profName}</p>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 25, 100]}
                    component="div"
                    count={chatRooms.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <button onClick={() => createRoom()}>방 생성 버튼</button>

            </Paper>
        </div>
    );
}

export default ChatRooms;