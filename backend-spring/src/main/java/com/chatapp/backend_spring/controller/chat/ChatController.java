package com.chatapp.backend_spring.controller.chat;

import com.chatapp.backend_spring.model.Conversation;
import com.chatapp.backend_spring.model.dto.request.PrivateConversationRequest;
import com.chatapp.backend_spring.model.dto.request.SendMessageRequest;
import com.chatapp.backend_spring.model.dto.response.ConversationListResponse;
import com.chatapp.backend_spring.model.dto.response.MessagePageResponse;
import com.chatapp.backend_spring.model.dto.response.MessageResponse;
import com.chatapp.backend_spring.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/private")
    public Conversation createPrivateConversation(@RequestBody PrivateConversationRequest request) {

        return chatService.createPrivateConversation(request);
    }

    @PostMapping("/send-message")
    public MessageResponse sendMessage(@RequestBody SendMessageRequest request ) {

        return chatService.sendMessage(request);
    }

    @GetMapping("/get-conversations")
    public List<ConversationListResponse>
    getMyConversations() {

        return chatService.getMyConversations();
    }

    @GetMapping("/get-messages")
    public MessagePageResponse getMessages(@RequestParam Long conversationId ,
                                           @RequestParam (defaultValue = "0") int page,
                                           @RequestParam (defaultValue = "20") int size) {

        return chatService.getMessage( conversationId, page, size );
    }
}