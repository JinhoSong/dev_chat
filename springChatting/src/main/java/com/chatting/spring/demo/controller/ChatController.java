package com.chatting.spring.demo.controller;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.file.FileInfo;
import com.chatting.spring.demo.s3.S3Service;
import com.chatting.spring.demo.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final S3Service s3Service;
    @MessageMapping("/chat/message")
    public void message(ChatMessage chatMessage){

        try {
            System.out.println(chatMessage.getFileInfo());
            System.out.println(chatMessage.getFileInfo().getFileToBase64());
            System.out.println(chatMessage.getMessageType());
        }catch (Exception e){
            log.info(String.valueOf(e));
        }
        finally {
            System.out.println("서비스실행");
            chatService.handleActions(chatMessage);
        }
    }

}
