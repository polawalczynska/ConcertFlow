package com.concertflow.api.budget.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record RequestBudgetRevisionRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotBlank(message = "Revision reason is required")
    @Size(min = 10, max = 1000, message = "Reason must be 10-1000 characters")
    String revisionReason,

    @NotNull(message = "List of required changes is required")
    @Size(min = 1, message = "You must provide at least one change")
    List<RevisionItem> requiredChanges,

    @NotNull(message = "Revision deadline is required")
    LocalDateTime deadline
) {}

