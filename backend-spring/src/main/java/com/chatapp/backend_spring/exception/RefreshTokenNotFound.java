package com.chatapp.backend_spring.exception;

public class RefreshTokenNotFound extends RuntimeException {

    public RefreshTokenNotFound(String message) {
        super(message);
    }
}
