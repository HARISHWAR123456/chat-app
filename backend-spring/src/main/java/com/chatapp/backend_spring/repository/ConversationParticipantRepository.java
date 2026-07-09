package com.chatapp.backend_spring.repository;

import com.chatapp.backend_spring.model.ConversationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, Long> {

    List<ConversationParticipant> findByUserId(Long userId);

    boolean existsByConversationIdAndUserId( Long conversationId, Long userId );

    List<ConversationParticipant> findByConversationId(Long conversationId);

    void deleteByConversationIdAndUserId(Long conversationId ,Long userId);


}