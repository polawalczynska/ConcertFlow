package com.concertflow.api.budget.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RejectBudgetRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotBlank(message = "Rejection reason is required")
    @Size(max = 1000, message = "Rejection reason must not exceed 1000 characters")
    String rejectionReason,

    @NotNull(message = "Budget version is required")
    Integer budgetVersion,

    String suggestions
) {}

