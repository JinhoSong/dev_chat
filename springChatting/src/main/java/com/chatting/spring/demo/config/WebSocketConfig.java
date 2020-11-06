package com.chatting.spring.demo.config;

import com.chatting.spring.demo.handler.WebSocketChatHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    //private final WebSocketHandler webSocketHandler;
    private final WebSocketChatHandler webSocketChatHandler;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //registry.addHandler(webSocketHandler,"/ws/chat").setAllowedOrigins("*");
        registry.addHandler(webSocketChatHandler,"/ws/chat").setAllowedOrigins("*");
    }
}
