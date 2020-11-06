package com.chatting.spring.demo.handler;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.ChatRoom;
import com.chatting.spring.demo.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketChatHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);
        //TextMessage textMessage = new TextMessage("Welcome chatting sever~^^");
        //session.sendMessage(textMessage);

        ChatMessage chatMessage = objectMapper.readValue(payload,ChatMessage.class);
        ChatRoom chatRoom = chatService.findRoomById(chatMessage.getRoomId());
        chatService.handleActions(session,chatMessage,chatRoom);
        //chatRoom.handleActions(session,chatMessage,chatService);
    }
}
