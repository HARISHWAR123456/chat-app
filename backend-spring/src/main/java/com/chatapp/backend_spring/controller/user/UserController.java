package com.chatapp.backend_spring.controller.user;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public String me(Authentication authentication) {

        return "Logged in user: " + authentication.getName();
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public String userProfile(){
        return "User Profile";
    }
}