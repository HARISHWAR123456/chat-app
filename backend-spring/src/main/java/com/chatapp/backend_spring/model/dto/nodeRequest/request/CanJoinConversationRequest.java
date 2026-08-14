package com.chatapp.backend_spring.model.dto.nodeRequest.request;

public record CanJoinConversationRequest(Long userId,

                                         Long conversationId) {

}
