package com.chatapp.backend_spring.controller.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard(){
        return "admin Dashboard";
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ADMIN')")
    public String me(Authentication authentication) {
        return "Logged in Admin: " + authentication.getName();
    }
}
