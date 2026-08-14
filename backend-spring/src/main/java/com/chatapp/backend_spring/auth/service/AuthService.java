package com.chatapp.backend_spring.auth.service;

import com.chatapp.backend_spring.auth.dto.AuthResponse;
import com.chatapp.backend_spring.auth.dto.LoginRequest;
import com.chatapp.backend_spring.auth.dto.RegisterRequest;
import com.chatapp.backend_spring.config.JwtService;
import com.chatapp.backend_spring.exception.RefreshTokenExpiredException;
import com.chatapp.backend_spring.exception.RefreshTokenNotFound;
import com.chatapp.backend_spring.exception.RefreshTokenRevokedException;
import com.chatapp.backend_spring.exception.UserNotFoundException;
import com.chatapp.backend_spring.model.RefreshToken;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.repository.RefreshTokenRepository;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final RefreshTokenService refreshTokenService;

    private final RefreshTokenRepository refreshTokenRepository;

    public AuthResponse register (RegisterRequest request){

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already exists",null ,null);
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "Username already exists",null,null);
        }

        User user = User.builder()
                   .username(request.getUsername())
                   .email(request.getEmail())
                   .role(request.getRole())
                   .password(passwordEncoder.encode(request.getPassword())).build();
        userRepository.save(user);

        return new AuthResponse(true,"User Register Successfully",null,null);
    }



    public AuthResponse login(LoginRequest request) {

       authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken
                       (request.getEmail(), request.getPassword()
               )
       );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new UserNotFoundException("Current User Not Found"));

        String token = jwtService.generateToken(user.getEmail(),user.getId());

        RefreshToken refreshToken=refreshTokenService.createRefreshToken(user);


        return new AuthResponse(true, "Login successful", token , refreshToken.getToken());
    }



    public AuthResponse refreshToken(String refreshTokenValue) {

        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(refreshTokenValue)
                        .orElseThrow(()-> new RefreshTokenNotFound("Refresh Token Not Found"));

        if (refreshToken.isRevoked()) {
            throw new RefreshTokenRevokedException("Refresh token revoked");
        }

        if (refreshToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            throw new RefreshTokenExpiredException("Refresh token expired");
        }

        String accessToken = jwtService.generateToken(
                refreshToken.getUser().getEmail(),refreshToken.getUser().getId()
        );

        return new AuthResponse(
                true,
                "Token refreshed",
                accessToken,
                refreshToken.getToken()
        );
    }

    public void logout(String refreshTokenValue) {

        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(refreshTokenValue)
                        .orElseThrow(()-> new RefreshTokenNotFound("Refresh token not found"));

        refreshToken.setRevoked(true);

        refreshTokenRepository.save(refreshToken);
    }
}
