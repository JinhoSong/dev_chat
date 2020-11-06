package com.chatting.spring.demo.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {

    private MessageType messageType;
    private String roomId;
    private String sender;
    private String message;
}
