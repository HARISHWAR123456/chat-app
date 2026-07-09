package com.chatapp.backend_spring.model.dto.request;

import lombok.Data;

@Data
public class SendMessageRequest {

    private Long conversationId;

    private String content;
}
