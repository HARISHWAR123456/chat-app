package com.chatapp.backend_spring.model.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class GroupConversationRequest {

    private  String name;

    private List<Long> participants;
}
