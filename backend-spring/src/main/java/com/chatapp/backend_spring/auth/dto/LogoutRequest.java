package com.chatapp.backend_spring.auth.dto;

import lombok.Data;

@Data
public class LogoutRequest {

    private String refreshToken;

}
