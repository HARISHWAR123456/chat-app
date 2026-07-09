package com.chatapp.backend_spring.auth.controller;

import com.chatapp.backend_spring.auth.dto.AuthResponse;
import com.chatapp.backend_spring.auth.dto.LoginRequest;
import com.chatapp.backend_spring.auth.dto.LogoutRequest;
import com.chatapp.backend_spring.auth.dto.RegisterRequest;
import com.chatapp.backend_spring.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register( @Valid @RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login( @RequestBody LoginRequest request) {
        System.out.println("controller.................................");
        return authService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refreshToken( @RequestParam String refreshToken) {

        return authService.refreshToken(refreshToken);
    }


    @PostMapping("/logout")
    public String logout(@RequestBody LogoutRequest refreshToken){
        authService.logout(refreshToken.getRefreshToken());

        return "Logged out successfully";
    }
}
