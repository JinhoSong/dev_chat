package com.chatting.spring.demo.chat;

import com.chatting.spring.demo.member.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {

    private MessageType messageType;
    private String roomId;
    private User user;
    //private String sender;
    private String message;
    private String time;
}
