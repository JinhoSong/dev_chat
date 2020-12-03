package com.chatting.spring.demo.controller;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpSession;
import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;


    @MessageMapping("/chat/message")
    public void message(ChatMessage chatMessage){
        System.out.println(chatMessage.getId());
        System.out.println(chatMessage.getUser().getName());
        System.out.println(chatMessage.getSessionId());
        System.out.println(chatMessage.getMessage());
        System.out.println(chatMessage.getMessageType());

        chatService.handleActions(chatMessage);
    }
}
