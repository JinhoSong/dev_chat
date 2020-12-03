package com.chatting.spring.demo.service;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final SimpMessageSendingOperations simpMessageSendingOperations; // 앞에 Simp주의 Simple이 아니다
    private final MemberService memberService;
    private final SimpMessagingTemplate messagingTemplate;
    private long count=0;
    public void handleActions(ChatMessage chatMessage) {

        MessageType command = chatMessage.getMessageType(); // 커맨드 명령어를 따로 뺀다.

        // 수업시간에 작성했던 코드와 똑같도록 명령어 단위로 나눈다.
        if (MessageType.ENTER.equals(command)) {
            chatMessage.setId(count++);
            this.enterRoom(chatMessage);
        } else if(MessageType.TALK.equals(command)){
            chatMessage.setId(count++);
            this.SendAllClient(chatMessage);
        } else if(MessageType.ATTEND.equals(command)){
            chatMessage.setId(count++);
            attend(chatMessage);
        } else if(MessageType.DELETE.equals(command)) {
            this.SendAllClient(chatMessage);
        }
    }

    public void enterRoom(ChatMessage chatMessage){
        // ENTER의 경우
        chatMessage.setMessage(chatMessage.getUser().getName() + "님이 입장했습니다."); // 메시지를 새로 세팅하고
        SendAllClient(chatMessage);
    }

    public void SendAllClient(ChatMessage chatMessage){
        String destination = getDestination(chatMessage.getRoomId());
       // simpMessageSendingOperations.convertAndSend(destination, chatMessage);
        messagingTemplate.convertAndSend(destination,chatMessage);
    }

    public void SendOneClient(ChatMessage chatMessage){
        String destinationWithSessionId = getDestinationWithSessionId(chatMessage.getSessionId());
        simpMessageSendingOperations.convertAndSend(destinationWithSessionId, chatMessage);
    }

    public void attend(ChatMessage chatMessage){
        long sendTime = System.currentTimeMillis();
        if("student".equals(chatMessage.getUser().getRole())){
            // 학생이 보낸 요청일 경우 -> 대답일 경우
            long result = sendTime - Long.parseLong(chatMessage.getMessage());
            if(result > 5000){ // 밀리초 단위이다.
                // 기준보다 대답을 늦게 했을 경우 ->
                chatMessage.setMessage("지각입니다!");
            } else {
                // 정상일 경우
                chatMessage.setMessage("정상 출석입니다!");
            }
            chatMessage.setMessageType(MessageType.ANSWER);
            this.SendOneClient(chatMessage);
        } else {
            // 교수가 보낸 요청일 경우
            chatMessage.setMessage(sendTime+""); // 요청을 보낸 시간을 저장한다.
            this.SendAllClient(chatMessage);
        }
    }

    public String getDestination(String chatRoomId){
        return "/sub/chat/room/"+ chatRoomId;
    }

    public String getDestinationWithSessionId(String sessionId){
        return "/sub/chat/sessionId/"+sessionId;
    }
}