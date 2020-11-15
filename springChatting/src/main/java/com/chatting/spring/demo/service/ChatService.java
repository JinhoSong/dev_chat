package com.chatting.spring.demo.service;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;


@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final SimpMessageSendingOperations simpMessageSendingOperations; // 앞에 Simp주의 Simple이 아니다

    public void handleActions(ChatMessage chatMessage) {

        MessageType command = chatMessage.getMessageType(); // 커맨드 명령어를 따로 뺀다.
        //System.out.println(command);
        // 수업시간에 작성했던 코드와 똑같도록 명령어 단위로 나눈다.
        if (MessageType.ENTER.equals(command)) {
            this.enterRoom(chatMessage);
        } else if(MessageType.TALK.equals(command)){
            this.SendAllClient(chatMessage);
        }
    }

    public void enterRoom(ChatMessage chatMessage){
        // ENTER의 경우
        chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다."); // 메시지를 새로 세팅하고
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/"+ chatMessage.getRoomId(), chatMessage);
        // 입장했습니다 표시를 보낸다.
    }

    public void SendAllClient(ChatMessage chatMessage){
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/"+ chatMessage.getRoomId(), chatMessage);
    }
}