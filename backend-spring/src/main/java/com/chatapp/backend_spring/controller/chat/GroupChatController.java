package com.chatapp.backend_spring.controller.chat;

import com.chatapp.backend_spring.model.dto.request.AddMembersToGroupRequest;
import com.chatapp.backend_spring.model.dto.request.CreateGroupRequest;
import com.chatapp.backend_spring.model.dto.request.RemoveMemberFromGroupRequest;
import com.chatapp.backend_spring.model.dto.response.ConversationResponse;
import com.chatapp.backend_spring.service.GroupChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/groupchat")
@RequiredArgsConstructor
public class GroupChatController {

    private final GroupChatService groupChatService;

    @PostMapping("/create-group")
    public ConversationResponse createGroupChat(@RequestBody CreateGroupRequest request){

        return groupChatService.createGroup(request);

    }

    @PostMapping("/add-member")
    public String addMemberToGroup(@RequestBody AddMembersToGroupRequest request){

        return groupChatService.addMemberToGroup(request);

    }

    @DeleteMapping("/remove-member")
    public String removeMemberFromGroup(@RequestBody RemoveMemberFromGroupRequest request){
         return groupChatService.removeMemberFromGroup(request);
    }
}


