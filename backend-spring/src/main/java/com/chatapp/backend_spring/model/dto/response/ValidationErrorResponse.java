package com.chatapp.backend_spring.model.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ValidationErrorResponse(boolean success,
                                      Map<String,String> errors,
                                      LocalDateTime timestamp) {
}
