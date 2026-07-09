package com.chatapp.backend_spring.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ConversationResponse {

    private Long id;

    private String name;

    private boolean groupChat;

    private LocalDateTime createdAt;
}