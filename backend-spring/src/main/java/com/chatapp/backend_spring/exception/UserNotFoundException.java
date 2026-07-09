package com.chatapp.backend_spring.exception;

public class UserNotFoundException extends RuntimeException{

    public  UserNotFoundException(String message){
        super(message);
    }
}
