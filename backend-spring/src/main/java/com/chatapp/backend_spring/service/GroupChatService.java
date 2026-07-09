package com.chatapp.backend_spring.service;

import com.chatapp.backend_spring.exception.*;
import com.chatapp.backend_spring.model.Conversation;
import com.chatapp.backend_spring.model.ConversationParticipant;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.model.dto.request.AddMembersToGroupRequest;
import com.chatapp.backend_spring.model.dto.request.CreateGroupRequest;
import com.chatapp.backend_spring.model.dto.request.RemoveMemberFromGroupRequest;
import com.chatapp.backend_spring.repository.ConversationParticipantRepository;
import com.chatapp.backend_spring.repository.ConversationRepository;
import com.chatapp.backend_spring.repository.UserRepository;
import com.chatapp.backend_spring.model.dto.response.ConversationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GroupChatService {
    private final UserRepository userRepository;

    private final ConversationRepository conversationRepository;

    private final ConversationParticipantRepository conversationParticipantRepository;

    public ConversationResponse createGroup (CreateGroupRequest request){

        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        User user=  userRepository.findByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        if(request.getName()== null || request.getName().trim().isEmpty()){
            throw new RuntimeException(
                    "Group name is required"
            );
        }

        if(request.getMemberIds() == null ||
                request.getMemberIds().size() < 2) {

            throw new RuntimeException(
                    "Group must contain at least 2 members"
            );
        }

        Conversation converstaion= Conversation.builder().name(request.getName()).groupChat(true).build();

        converstaion=conversationRepository.save(converstaion);

        Set<Long> allMembers = new HashSet<>(request.getMemberIds());
        allMembers.add(user.getId());

        for( Long memberId: allMembers){
            User member=userRepository.findById(memberId)
                    .orElseThrow(()-> new UserNotFoundException("User Id not Found :"+memberId));

            ConversationParticipant conversationParticipant=ConversationParticipant.builder()
                    .conversation(converstaion)
                    .user(member)
                    .build();
            conversationParticipantRepository.save(conversationParticipant);
        }

        return ConversationResponse.builder()
                .id(converstaion.getId())
                .name(converstaion.getName())
                .groupChat(converstaion.isGroupChat())
                .createdAt(converstaion.getCreatedAt())
                .build();

    }

    public String addMemberToGroup(AddMembersToGroupRequest request) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        User requestUser =
                userRepository
                        .findById(request.getUserId())
                        .orElseThrow(()-> new UserNotFoundException("Requested user not found"));

        Conversation conversation =
                conversationRepository
                        .findById(request.getConversationId())
                        .orElseThrow(()-> new ConversationNotFoundException("Conversation not found"));

        if (!conversation.isGroupChat()) {
            throw new InvalidConversationTypeException(
                    "Cannot add members to private chat"
            );
        }

        if (!conversationParticipantRepository
                .existsByConversationIdAndUserId(
                        request.getConversationId(),
                        currentUser.getId())) {

            throw new UnauthorizedOperationException(
                    "You are not a member of this group"
            );
        }

        if (conversationParticipantRepository
                .existsByConversationIdAndUserId(
                        request.getConversationId(),
                        request.getUserId())) {

            throw new UserAlreadyInGroupException(
                    "User already exists in group"
            );
        }

        ConversationParticipant participant =
                ConversationParticipant.builder()
                        .conversation(conversation)
                        .user(requestUser)
                        .build();

        conversationParticipantRepository.save(participant);

        return "User added successfully";
    }
@Transactional
    public String removeMemberFromGroup(RemoveMemberFromGroupRequest request){

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(()-> new UserNotFoundException("Current user not found"));

        User requestUser =
                userRepository
                        .findById(request.getRemoveMemberId())
                        .orElseThrow(()-> new UserNotFoundException("Requested Member Not Found"));


        Conversation conversation =
                conversationRepository
                        .findById(request.getConversationId())
                        .orElseThrow(()-> new ConversationNotFoundException("Conversation not found"));

        if (!conversation.isGroupChat()) {
            throw new InvalidConversationTypeException(
                    "Cannot Remove Members from private chat"
            );
        }

        if (!conversationParticipantRepository
                .existsByConversationIdAndUserId(
                        request.getConversationId(),
                        currentUser.getId())) {

            throw new UnauthorizedOperationException(
                    "You are not a participant of this group"
            );
        }

        if (!conversationParticipantRepository
                .existsByConversationIdAndUserId(
                        request.getConversationId(),
                        request.getRemoveMemberId())) {

            throw new UserNotInGroupException(
                    "User to remove does not exists in this group"
            );
        }

    conversationParticipantRepository.deleteByConversationIdAndUserId
            (request.getConversationId(),request.getRemoveMemberId());

        return "User :"+requestUser.getUsername()+" Removed From The Group";

    }
}
