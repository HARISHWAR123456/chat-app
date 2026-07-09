package com.chatapp.backend_spring.repository;

import com.chatapp.backend_spring.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message,Long> {

    Optional<Message> findTopByConversationIdOrderByCreatedAtDesc(Long conversationId);

    Page<Message> findByConversationIdOrderByCreatedAtDesc( Long conversationId, Pageable pageable );
}
