package com.chatapp.backend_spring.service;

import com.chatapp.backend_spring.exception.UserNotFoundException;
import com.chatapp.backend_spring.exception.UsernameAlreadyExistsException;
import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.model.dto.request.UpdateUsernameRequest;
import com.chatapp.backend_spring.model.dto.response.UserResponse;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CacheManager cacheManager;


    @Cacheable(
            cacheNames = "userProfile",
            key = "T(org.springframework.security.core.context.SecurityContextHolder)"
                    + ".getContext().getAuthentication().getName()"
    )
    public UserResponse getCurrentUserProfile() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        System.out.println("1. Entered service: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        System.out.println("2. User retrieved: " + user.getEmail());

        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();

        System.out.println("3. UserResponse created: " + response);

        return response;
    }

    @Transactional
    public UserResponse updateUsername(UpdateUsernameRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String newUsername = request.getUsername().trim();

        if (newUsername.equals(user.getUsername())) {
            throw new IllegalArgumentException(
                    "New username cannot be the same as your current username"
            );
        }

        if (userRepository.existsByUsername(newUsername)) {
            throw new UsernameAlreadyExistsException(
                    "Username '" + newUsername + "' is already taken"
            );
        }

        user.setUsername(newUsername);
        User updatedUser = userRepository.save(user);

        // Evict the cache only after the transaction commits successfully.
        TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        cacheManager.getCache("userProfile").evict(email);
                    }
                }
        );

        return UserResponse.builder()
                .id(updatedUser.getId())
                .username(updatedUser.getUsername())
                .email(updatedUser.getEmail())
                .build();
    }
}
