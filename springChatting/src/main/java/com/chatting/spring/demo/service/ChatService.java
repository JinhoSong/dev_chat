package com.chatting.spring.demo.service;

import com.chatting.spring.demo.chat.ChatMessage;
import com.chatting.spring.demo.chat.MessageType;
import com.chatting.spring.demo.file.FileInfo;
import com.chatting.spring.demo.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;


@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final SimpMessageSendingOperations simpMessageSendingOperations; // 앞에 Simp주의 Simple이 아니다
    private final S3Service s3Service;
    private final SimpMessagingTemplate messagingTemplate;
    private final FileInfoService fileInfoService;
    private long count = 0;
    private final Map<String, String> fileSetting;

    @SneakyThrows
    public void handleActions(ChatMessage chatMessage) {

        MessageType command = chatMessage.getMessageType(); // 커맨드 명령어를 따로 뺀다.
        FileInfo fileInfo = chatMessage.getFileInfo();

        if (MessageType.ENTER.equals(command)) {
            chatMessage.setId(count++);
            this.enterRoom(chatMessage);

        } else if (MessageType.TALK.equals(command)) {
            chatMessage.setId(count++);
            this.SendAllClient(chatMessage);

        } else if (MessageType.ATTEND.equals(command)) {
            chatMessage.setId(count++);
            attend(chatMessage);

        } else if (MessageType.DELETE.equals(command)) {
            this.SendAllClient(chatMessage);

        } else if (MessageType.FILE.equals(command)) {
            SendFilePath(chatMessage);

        } else if (MessageType.FILESTART.equals(command)) {
            fileSetting.put(fileInfo.getFileName(), fileInfo.getFileToBase64());

        } else if (MessageType.FILESENDING.equals(command)) {
            String tmp = fileSetting.get(chatMessage.getFileInfo().getFileName());
            // tmp에 키값으로 가져온 base64데이터를 넣는다.

            String add = fileInfo.getFileToBase64();
            // 추가 데이터를 가져온다.
            tmp = tmp.concat(add);
            // tmp에 추가하고

            fileInfo.setFileToBase64(tmp);
            fileSetting.put(fileInfo.getFileName(), tmp);
            System.out.println(fileInfo.getFileToBase64());

        } else if (MessageType.FILEEND.equals(command)) {
            String tmp = fileSetting.get(chatMessage.getFileInfo().getFileName());
            // tmp에 키값으로 가져온 base64데이터를 넣는다.

            String add = fileInfo.getFileToBase64();
            // 추가 데이터를 가져온다.
            tmp = tmp.concat(add);
            // tmp에 추가하고

            fileInfo.setFileToBase64(tmp);
            chatMessage.setFileInfo(fileInfo);
            SendFilePath(chatMessage);
        }

    }

    public void enterRoom(ChatMessage chatMessage) {
        // ENTER의 경우
        chatMessage.setMessage(chatMessage.getUser().getName() + "님이 입장했습니다."); // 메시지를 새로 세팅하고
        SendAllClient(chatMessage);
    }

    public void SendAllClient(ChatMessage chatMessage) {
        String destination = getDestination(chatMessage.getRoomId());
        // simpMessageSendingOperations.convertAndSend(destination, chatMessage);
        messagingTemplate.convertAndSend(destination, chatMessage);
    }

    public void SendOneClient(ChatMessage chatMessage) {
        String destinationWithSessionId = getDestinationWithSessionId(chatMessage.getSessionId());
        simpMessageSendingOperations.convertAndSend(destinationWithSessionId, chatMessage);
    }

    public void SendFilePath(ChatMessage chatMessage) throws IOException {
        MultipartFile file = fileInfoService.setMultipartFile(chatMessage.getFileInfo());
        chatMessage.setMessage(s3Service.upload(file));
        chatMessage.setId(count++);
        if (Objects.equals(file.getContentType(), "image/jpeg")){
            chatMessage.setMessageType(MessageType.IMAGE);
        } else {
            chatMessage.setMessageType(MessageType.FILE);
        }
        this.SendAllClient(chatMessage);
    }

    public void attend(ChatMessage chatMessage) {
        long sendTime = System.currentTimeMillis();
        if ("student".equals(chatMessage.getUser().getRole())) {
            // 학생이 보낸 요청일 경우 -> 대답일 경우
            long result = sendTime - Long.parseLong(chatMessage.getMessage());
            if (result > 5000) { // 밀리초 단위이다.
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
            chatMessage.setMessage(sendTime + ""); // 요청을 보낸 시간을 저장한다.
            this.SendAllClient(chatMessage);
        }
    }

    public String getDestination(String chatRoomId) {
        return "/sub/chat/room/" + chatRoomId;
    }

    public String getDestinationWithSessionId(String sessionId) {
        return "/sub/chat/sessionId/" + sessionId;
    }
}