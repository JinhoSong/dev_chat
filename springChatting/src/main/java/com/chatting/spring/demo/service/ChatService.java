package com.chatting.spring.demo.service;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.Date;


@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final SimpMessageSendingOperations simpMessageSendingOperations; // 앞에 Simp주의 Simple이 아니다
    private final MemberService memberService;

    public void handleActions(ChatMessage chatMessage) {

        MessageType command = chatMessage.getMessageType(); // 커맨드 명령어를 따로 뺀다.
        //System.out.println(command);
        // 수업시간에 작성했던 코드와 똑같도록 명령어 단위로 나눈다.
        if (MessageType.ENTER.equals(command)) {
            this.enterRoom(chatMessage);
        } else if(MessageType.TALK.equals(command)){
            this.SendAllClient(chatMessage);
        } else if(MessageType.ATTEND.equals(command)){
            attend(chatMessage);
        }
    }

    public void enterRoom(ChatMessage chatMessage){
        // ENTER의 경우
        chatMessage.setMessage(chatMessage.getUser().getName() + "님이 입장했습니다."); // 메시지를 새로 세팅하고
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/"+ chatMessage.getRoomId(), chatMessage);
        // 입장했습니다 표시를 보낸다.
    }

    public void SendAllClient(ChatMessage chatMessage){
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/"+ chatMessage.getRoomId(), chatMessage);
    }

    public void attend(ChatMessage chatMessage){
        long sendTime = System.currentTimeMillis();
        if("student".equals(chatMessage.getUser().getRole())){
            // 학생이 보낸 요청일 경우 -> 대답일 경우
            System.out.println(chatMessage.getMessage());
            System.out.println(sendTime);
            long result = sendTime - Long.parseLong(chatMessage.getMessage());
            if(result > 5000){ // 밀리초 단위이다.
                // 기준보다 대답을 늦게 했을 경우 ->
                chatMessage.setMessage("지각입니다!");
            } else {
                // 정상일 경우
                chatMessage.setMessage("정상 출석입니다!");
            }
            chatMessage.setMessageType(MessageType.ANSWER);
        } else {
            // 교수가 보낸 요청일 경우
            chatMessage.setMessage(sendTime+""); // 요청을 보낸 시간을 저장한다.
        }
        this.SendAllClient(chatMessage);
        System.out.println(chatMessage);
    }
}