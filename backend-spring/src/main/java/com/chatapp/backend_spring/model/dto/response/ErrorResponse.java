package com.chatapp.backend_spring.model.dto.response;

import java.time.LocalDateTime;

public record ErrorResponse(boolean success,
                            String message,
                            LocalDateTime timestamp) {

}
