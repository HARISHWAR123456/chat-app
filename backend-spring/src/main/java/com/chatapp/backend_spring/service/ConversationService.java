package com.chatapp.backend_spring.service;

import com.chatapp.backend_spring.model.dto.nodeRequest.request.CanJoinConversationRequest;
import com.chatapp.backend_spring.repository.ConversationParticipantRepository;
import com.chatapp.backend_spring.repository.ConversationRepository;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository conversationParticipantRepository;

    public boolean canJoinConversation(Long userId, Long conversationId){

        if(!userRepository.existsById(userId)){
            return false;
        }

        if (!conversationRepository.existsById(conversationId)) {
            return false;
        }

        return conversationParticipantRepository
                .existsByConversationIdAndUserId(
                        conversationId,
                        userId
                );
    }

}
