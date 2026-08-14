package com.chatapp.backend_spring.controller.conversation;

import com.chatapp.backend_spring.model.dto.nodeRequest.request.CanJoinConversationRequest;
import com.chatapp.backend_spring.model.dto.nodeRequest.response.CanJoinConversationResponse;
import com.chatapp.backend_spring.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    @PostMapping("/can-join")
    public CanJoinConversationResponse canJoinConversationResponse(@RequestBody CanJoinConversationRequest request){
        boolean allowed = conversationService.canJoinConversation(
                request.userId(),
                request.conversationId()
        );
        return new CanJoinConversationResponse(allowed);
    }
}
