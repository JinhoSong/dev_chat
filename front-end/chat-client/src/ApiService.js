import axios from "axios";
const BASE_URL = "http://localhost:8080/";
const CHATROOM_URL = BASE_URL+"api/chat/rooms";
class ApiService {
    getChatRooms(){
        return axios.get(CHATROOM_URL);
    }
}
export default new ApiService();
