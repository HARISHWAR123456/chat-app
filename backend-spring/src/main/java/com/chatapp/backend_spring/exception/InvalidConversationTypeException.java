package com.chatapp.backend_spring.exception;

public class InvalidConversationTypeException extends RuntimeException {
    public InvalidConversationTypeException(String message) {
        super(message);
    }
}
