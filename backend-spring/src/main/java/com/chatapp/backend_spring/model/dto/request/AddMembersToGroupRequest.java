package com.chatapp.backend_spring.model.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class AddMembersToGroupRequest {

    private Long userId;

    private Long conversationId;

}
