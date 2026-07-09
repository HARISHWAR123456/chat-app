package com.chatapp.backend_spring.WebSocket;

import com.chatapp.backend_spring.config.JwtService;
import com.chatapp.backend_spring.exception.UserNotFoundException;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.repository.ConversationParticipantRepository;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final ConversationParticipantRepository conversationParticipantRepository;


    @Override
    public @Nullable Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(
                accessor.getCommand())) {

            String authHeader= accessor.getFirstNativeHeader("Authorization");
            if(authHeader==null || !authHeader.startsWith("Bearer ")){

                throw new RuntimeException("Missing or Invalid JWT");

            }
            String jwt=authHeader.substring(7);

            String email = jwtService.extractEmail(jwt);


            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(email);


            if (!jwtService.isTokenValid(jwt,email)) {

                throw new RuntimeException(
                        "Invalid JWT Token"
                );
            }

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            accessor.setUser(auth);

        }
        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {

            String destination =
                    accessor.getDestination();

            if (destination != null &&
                    destination.startsWith("/topic/conversation/")) {

                Long conversationId =
                        Long.parseLong(
                                destination.substring(
                                        "/topic/conversation/".length()
                                )
                        );

                String email =
                        accessor.getUser().getName();

                User user =
                        userRepository.findByEmail(email)
                                .orElseThrow(
                                        () -> new UserNotFoundException(
                                                "User not found"
                                        )
                                );

                boolean isParticipant =
                        conversationParticipantRepository
                                .existsByConversationIdAndUserId(
                                        conversationId,
                                        user.getId()
                                );

                if (!isParticipant) {
                    throw new AccessDeniedException(
                            "You are not allowed to subscribe to this conversation"
                    );
                }
            }
        }
        return message;

    }
}
