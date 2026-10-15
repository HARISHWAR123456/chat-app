package com.chatapp.backend_spring.controller.user;

import com.chatapp.backend_spring.model.dto.request.UpdateUsernameRequest;
import com.chatapp.backend_spring.model.dto.response.UserResponse;
import com.chatapp.backend_spring.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public String me(Authentication authentication) {
        return "Logged in user: " + authentication.getName();
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> userProfile() {
        System.out.println("user profile enter.................................");

        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    @PutMapping("/username")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> updateUsername(@Valid @RequestBody UpdateUsernameRequest request) {
        return ResponseEntity.ok(userService.updateUsername(request));
    }
}