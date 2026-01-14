package com.concertflow.api.technical.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record RequestTechnicalRevisionRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotBlank(message = "Revision reason is required")
    String revisionReason,

    @NotNull(message = "List of required changes is required")
    @Size(min = 1, message = "You must provide at least one change")
    List<TechnicalRevisionItem> requiredChanges,

    @NotNull(message = "Revision deadline is required")
    LocalDateTime deadline
) {}

