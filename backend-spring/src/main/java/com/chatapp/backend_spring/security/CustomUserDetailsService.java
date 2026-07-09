package com.chatapp.backend_spring.security;

import com.chatapp.backend_spring.model.User;
import com.chatapp.backend_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user= userRepository.findByEmail(username)
                .orElseThrow(
                        ()->(new UsernameNotFoundException("User Not Found") ) );

        return new CustomUserDetails(user);
    }
}
