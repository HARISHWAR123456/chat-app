package com.chatapp.backend_spring.model.dto.request;

import lombok.Data;

@Data
public class RemoveMemberFromGroupRequest {

    private Long removeMemberId;

    private Long conversationId;

}
