package com.chatting.spring.demo.controller;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage chatMessage){

        try {
            System.out.println(chatMessage.getMessageType());
        }catch (Exception e){
            log.info(String.valueOf(e));
        }
        finally {
            chatService.handleActions(chatMessage);
        }
    }

}
