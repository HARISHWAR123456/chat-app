package com.chatapp.backend_spring.WebSocket;

import com.chatapp.backend_spring.exception.UserNotFoundException;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final UserRepository userRepository;

    private final PresenceService presenceService;

    private static final Logger logger =
            LoggerFactory.getLogger(PresenceService.class);


    @EventListener
    public void handleConnect( SessionConnectEvent event) {

        if (event.getUser() == null) {
            return;
        }

        String email=event.getUser().getName();

        User user= userRepository.findByEmail(email).orElseThrow(()-> new  UserNotFoundException(  "Connected user not found"));

        presenceService.userConnected(user.getId());

        logger.info("User {} connected", user.getEmail());
    }

    @EventListener
    public void handleDisconnect( SessionDisconnectEvent event) {

        if (event.getUser() == null) {
            return;
        }

        String email = event.getUser().getName();

        User user= userRepository.findByEmail(email).orElseThrow(()-> new  UserNotFoundException(  "Connected user not found"));

        presenceService.userDisconnected(user.getId());

        logger.info("User {} Disconnected", user.getEmail());
    }


}
