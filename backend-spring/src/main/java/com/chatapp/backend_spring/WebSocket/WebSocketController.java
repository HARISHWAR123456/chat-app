package com.chatapp.backend_spring.WebSocket;

import com.chatapp.backend_spring.model.dto.request.SendMessageRequest;
import com.chatapp.backend_spring.model.dto.response.MessageResponse;
import com.chatapp.backend_spring.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller   // here  we use @Controller annotation because we are not going to handle the http request so no @RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final ChatService chatService; // from here we are going to call the chat service

    private final SimpMessagingTemplate messagingTemplate;  //this is a template helps send WebSocket messages

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(SendMessageRequest request, Principal principal) {

//        MessageResponse response = chatService.sendMessage(request);

//        MessageResponse response =
//                chatService.sendMessage(
//                        request,
//                        principal.getName()
//                );


//        messagingTemplate.convertAndSend("/topic/conversation/"+request.getConversationId(),response);
//        //Sends the response message to all WebSocket clients currently subscribed
//        //to /topic/conversation/{conversationId} in real time
//

    }
}
