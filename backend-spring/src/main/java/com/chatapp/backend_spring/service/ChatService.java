package com.chatapp.backend_spring.service;

import com.chatapp.backend_spring.exception.ConversationNotFoundException;
import com.chatapp.backend_spring.exception.UnauthorizedOperationException;
import com.chatapp.backend_spring.exception.UserNotFoundException;
import com.chatapp.backend_spring.mapper.ChatMapper;
import com.chatapp.backend_spring.model.Conversation;
import com.chatapp.backend_spring.model.ConversationParticipant;
import com.chatapp.backend_spring.model.Message;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.model.dto.request.PrivateConversationRequest;
import com.chatapp.backend_spring.model.dto.request.SendMessageRequest;
import com.chatapp.backend_spring.repository.ConversationParticipantRepository;
import com.chatapp.backend_spring.repository.ConversationRepository;
import com.chatapp.backend_spring.repository.MessageRepository;
import com.chatapp.backend_spring.repository.UserRepository;
import com.chatapp.backend_spring.model.dto.response.ConversationListResponse;
import com.chatapp.backend_spring.model.dto.response.MessagePageResponse;
import com.chatapp.backend_spring.model.dto.response.MessageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;

    private final ConversationRepository conversationRepository;

    private final ConversationParticipantRepository conversationParticipantRepository;

    private final MessageRepository messageRepository;


    public Conversation createPrivateConversation(PrivateConversationRequest request) {

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        User targetUser = userRepository.findById(request.getUserId())
                .orElseThrow(()-> new UserNotFoundException("Requested user not found"));

        return conversationRepository.findPrivateConversation(currentUser.getId(), targetUser.getId())
                .orElseGet(() -> {
                    Conversation conversation = Conversation.builder()
                            .groupChat(false)
                            .build();

                    conversation = conversationRepository.save(conversation);

                    ConversationParticipant cp1 = ConversationParticipant.builder()
                            .user(currentUser)
                            .conversation(conversation)
                            .build();

                    ConversationParticipant cp2 = ConversationParticipant.builder()
                            .user(targetUser)
                            .conversation(conversation)
                            .build();

                    conversationParticipantRepository.save(cp1);
                    conversationParticipantRepository.save(cp2);
                    return conversation;
                });
    }

    @Transactional
    public MessageResponse sendMessage(SendMessageRequest request ) {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        User sender = userRepository.findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("Current user not found"));;

        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(()-> new ConversationNotFoundException("Conversation not found"));

        boolean isParticipant =
                conversationParticipantRepository
                        .existsByConversationIdAndUserId(
                                conversation.getId(),
                                sender.getId()
                        );
        if (!isParticipant) {
            throw new UnauthorizedOperationException(
                    "You are not part of this conversation"
            );
        }
        Message message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(request.getContent())
                .build();

        Message savedMessage = messageRepository.save(message);

        return ChatMapper.mapMessage(savedMessage);

    }


    private String getConversationName( Conversation conversation, User currentUser) {

        if (conversation.isGroupChat()) {
            return conversation.getName();
        }

        List<ConversationParticipant> participants =
                conversationParticipantRepository
                        .findByConversationId(
                                conversation.getId()
                        );

        return participants.stream()
                .map(ConversationParticipant::getUser)
                .filter(user ->
                        !user.getId()
                                .equals(currentUser.getId())
                )
                .findFirst()
                .orElseThrow(()->new UserNotFoundException("Conversation participant not found"))
                .getUsername();
    }

    public List<ConversationListResponse> getMyConversations() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository
                .findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        List<ConversationParticipant> participations = conversationParticipantRepository.findByUserId(currentUser.getId());

        return participations.stream()
                .map(participant -> {

                    Conversation conversation =
                            participant.getConversation();

                    Optional<Message> lastMessage =
                            messageRepository
                                    .findTopByConversationIdOrderByCreatedAtDesc(
                                            conversation.getId()
                                    );

                    return ConversationListResponse
                            .builder()
                            .conversationId(conversation.getId())
                            .name(getConversationName(conversation, currentUser))
                            .groupChat(conversation.isGroupChat())
                            .lastMessage(lastMessage.map(Message::getContent).orElse(null))
                            .lastMessageTime(lastMessage.map(Message::getCreatedAt).orElse(null))
                            .build();

                }).toList();
    }

    public MessagePageResponse getMessage(Long conversationId, int page, int size) {

        String email =SecurityContextHolder.getContext().getAuthentication().getName();

        User user= userRepository.findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        boolean isParticipant=conversationParticipantRepository.existsByConversationIdAndUserId(conversationId,user.getId());

        if(!isParticipant){
            throw new UnauthorizedOperationException("You are Not Part of this conversation");
        }

        Pageable pageable= PageRequest.of(page,size);

        Page <Message> messagePage = messageRepository.findByConversationIdOrderByCreatedAtDesc(conversationId,pageable);

        List<MessageResponse> messages =
                messagePage
                        .getContent()
                        .stream()
                        .map(ChatMapper::mapMessage)
                        .toList();

        return MessagePageResponse
                .builder()
                .messages(messages)
                .currentPage(messagePage.getNumber())
                .totalPages(messagePage.getTotalPages())
                .totalElements(messagePage.getTotalElements())
                .hasNext(messagePage.hasNext())
                .build();

    }
}


