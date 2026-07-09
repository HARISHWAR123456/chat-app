package com.chatapp.backend_spring.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class MessagePageResponse {
    private List<MessageResponse> messages;

    private int currentPage;

    private int totalPages;

    private long totalElements;

    private boolean hasNext;
}

