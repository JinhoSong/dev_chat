package com.chatting.spring.demo.service;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.ChatRoom;
import com.chatting.spring.demo.chat.MessageType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }
    // messageType에 따라 다르게 이용될 프로토콜을 정의한다. ex 100 -> 입장하기
    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatRoom chatRoom) {
        //log.info("dddd",chatMessage);
        MessageType command = chatMessage.getMessageType(); // 커맨드 명령어를 따로 뺀다.

        // 수업시간에 작성했던 코드와 똑같도록 명령어 단위로 나눈다.
        if (MessageType.ENTER.equals(command)) {
            this.enterRoom(session,chatMessage,chatRoom);
        } else if(MessageType.TALK.equals(command)){
            this.sendMessageAllClient(chatMessage,chatRoom);
        }

//        sendMessage(chatMessage, chatService);
    }

    public void enterRoom(WebSocketSession session, ChatMessage chatMessage,ChatRoom chatRoom){
        // ENTER의 경우
        chatRoom.getSessions().add(session); // 채팅에 참가한 모든 세션을 가져온다.
        chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다."); // 메시지를 새로 세팅하고
        this.sendMessageAllClient(chatMessage,chatRoom); // 보낸다.
        // 입장했습니다 표시를 보낸다.
    }

    public void sendMessageAllClient(ChatMessage chatMessage,ChatRoom chatRoom) {
        //일반적인 TALK
        chatRoom.getSessions().parallelStream().forEach(session -> this.sendMessageForOneClient(session,chatMessage ));
    }
    public void sendMessageForOneClient(WebSocketSession session, ChatMessage chatMessage) {
        try {
            String sendMessage = chatMessage.getSender() + " : "+ chatMessage.getMessage();
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(sendMessage)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}