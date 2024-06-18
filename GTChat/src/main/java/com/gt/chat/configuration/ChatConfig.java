package com.gt.chat.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.gt.chat.constant.ChatConstant;
import com.gt.chat.handler.ChatWebSocketHandler;

@Configuration
@EnableWebSocket
public class ChatConfig implements WebSocketConfigurer {
    

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(getWebSocketService(), ChatConstant.ENDPOINT_CHAT).setAllowedOrigins("*");
        
    }
    
    @Bean
    public WebSocketHandler getWebSocketService() {
        return new ChatWebSocketHandler();
    }

}
