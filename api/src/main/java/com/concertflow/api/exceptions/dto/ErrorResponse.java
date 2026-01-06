package com.concertflow.api.exceptions.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Value
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    String type;
    String title;
    String detail;
    Integer status;
    String instance;
    Instant timestamp;
    List<String> errors;
    Map<String, Object> properties;

    public static ErrorResponse of(String title, String detail, Integer status) {
        return ErrorResponse.builder()
                .title(title)
                .detail(detail)
                .status(status)
                .timestamp(Instant.now())
                .build();
    }

    public static ErrorResponse of(String title, String detail, Integer status, List<String> errors) {
        return ErrorResponse.builder()
                .title(title)
                .detail(detail)
                .status(status)
                .errors(errors)
                .timestamp(Instant.now())
                .build();
    }
}

