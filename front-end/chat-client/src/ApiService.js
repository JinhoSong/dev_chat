import axios from "axios";
const BASE_URL = "http://localhost:8080/";
const CHATROOM_URL = BASE_URL+"api/chat";
class ApiService {
    getChatRooms(){
        return axios.get(CHATROOM_URL+"/rooms");
    }
    //http://localhost:8080/api/chat/room?roomName=test&profName=asdf
    createChatRooms(roomName,profName,tag){
        return axios.post(CHATROOM_URL+"/room?roomName="+roomName+"&profName="+profName+"&tag="+tag);
    }
}
export default new ApiService();
