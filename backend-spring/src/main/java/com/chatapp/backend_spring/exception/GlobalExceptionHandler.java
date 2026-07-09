package com.chatapp.backend_spring.exception;

import com.chatapp.backend_spring.model.dto.response.ErrorResponse;
import com.chatapp.backend_spring.model.dto.response.ValidationErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(ConversationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleConversationNotFoundException(ConversationNotFoundException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(UnauthorizedOperationException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedOperationException(UnauthorizedOperationException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMessageNotFoundException(MessageNotFoundException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<ErrorResponse> handleRefreshTokenExpiredException(RefreshTokenExpiredException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(RefreshTokenRevokedException.class)
    public ResponseEntity<ErrorResponse> handleRefreshTokenRevokedException(RefreshTokenRevokedException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(InvalidConversationTypeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidConversationTypeException(InvalidConversationTypeException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(UserAlreadyInGroupException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyInGroupException(UserAlreadyInGroupException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler(UserNotInGroupException.class)
    public ResponseEntity<ErrorResponse> handleUserNotInGroupException(UserNotInGroupException ex){

        ErrorResponse errorResponse=new ErrorResponse(false,ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(RefreshTokenNotFound.class)
    public ResponseEntity<ErrorResponse>handleRefreshTokenNotFound(RefreshTokenNotFound ex){

        ErrorResponse errorResponse =new ErrorResponse(false,ex.getMessage(),LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){

        Map<String,String> errors=new HashMap<>();


                ex.getBindingResult().getFieldErrors()
                        .forEach(
                                error->errors.put(error.getField(),error.getDefaultMessage()));

        ValidationErrorResponse errorResponse =
                new ValidationErrorResponse(
                        false,
                        errors,
                        LocalDateTime.now()
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex){

        ErrorResponse errorResponse =new ErrorResponse(false,"Something went wrong",LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

}
