package com.chatting.spring.demo.controller;

import com.chatting.spring.demo.Repository.ChatRoomRepository;
import com.chatting.spring.demo.chat.ChatRoom;
import com.chatting.spring.demo.util.ServletUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatRoomApiController {

    private final ChatRoomRepository chatRoomRepository;

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }

    // 채팅방 생성
    @PostMapping("/room")
    public List<ChatRoom> createRoom(@RequestParam String roomName,@RequestParam String profName,@RequestParam String tag) {
        chatRoomRepository.createRoom(roomName,profName,tag);
        // 전체를 리턴시켜준다.
        return chatRoomRepository.findAllRoom();
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(@PathVariable String roomId) {
        if(Objects.requireNonNull(ServletUtil.getSession()).getId() != null) {
            return ServletUtil.getSession().getId();
        }
        else
            return "error";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }
}
