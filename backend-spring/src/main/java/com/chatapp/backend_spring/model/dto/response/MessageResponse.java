package com.chatapp.backend_spring.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MessageResponse {

    private Long id;

    private String content;

    private LocalDateTime createdAt;

    private UserResponse sender;

    private ConversationResponse conversation;
}