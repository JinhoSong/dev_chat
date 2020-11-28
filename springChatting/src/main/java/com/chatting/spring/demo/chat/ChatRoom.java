package com.chatting.spring.demo.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
@Slf4j
public class ChatRoom {
    private String roomId;
    private String roomName; // 과목명
    private String tag;
    private String profName;
    //private ArrayList<Member> members;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String roomName,String tag,String profName) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.tag = tag;
        this.profName = profName;
    }
}
