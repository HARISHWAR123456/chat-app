package com.chatapp.backend_spring.repository;

import com.chatapp.backend_spring.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation,Long> {

    @Query("""
        SELECT c FROM Conversation c
        JOIN ConversationParticipant cp1
            ON cp1.conversation = c
        JOIN ConversationParticipant cp2
            ON cp2.conversation = c
        WHERE c.groupChat = false
        AND cp1.user.id = :user1Id
        AND cp2.user.id = :user2Id
    """)
    Optional<Conversation> findPrivateConversation( Long user1Id, Long user2Id );



}
