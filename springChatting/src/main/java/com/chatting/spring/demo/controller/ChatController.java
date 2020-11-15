package com.chatting.spring.demo.controller;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage chatMessage){
        System.out.println(chatMessage.getMessage());
        System.out.println(chatMessage.getSender());
        System.out.println(chatMessage.getRoomId());
        System.out.println(chatMessage.getMessageType());
        chatService.handleActions(chatMessage);
    }
}
