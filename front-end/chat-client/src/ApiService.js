import axios from "axios";
const BASE_URL = "http://localhost:8080/";
const CHATROOM_URL = BASE_URL+"api/chat";
class ApiService {
    getChatRooms(){
        return axios.get(CHATROOM_URL+"/rooms");
    }
    createChatRooms(roomName){
        return axios.post(CHATROOM_URL+"/room?roomName="+roomName);
    }
}
export default new ApiService();
