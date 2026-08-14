package com.chatapp.backend_spring.mapper;

import com.chatapp.backend_spring.model.Conversation;
import com.chatapp.backend_spring.model.Message;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.model.dto.response.ConversationResponse;
import com.chatapp.backend_spring.model.dto.response.MessageResponse;
import com.chatapp.backend_spring.model.dto.response.UserResponse;

public class ChatMapper {


    public static UserResponse mapUser(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    public static ConversationResponse mapConversation(Conversation conversation) {

        return ConversationResponse.builder()
                .id(conversation.getId())
                .name(conversation.getName())
                .groupChat(conversation.isGroupChat())
                .createdAt(conversation.getCreatedAt())
                .build();
    }

    public static MessageResponse mapMessage(Message message) {

        return MessageResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .sender(mapUser(message.getSender()))
                .build();
    }

}
