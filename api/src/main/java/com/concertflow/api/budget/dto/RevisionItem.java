package com.concertflow.api.budget.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RevisionItem(
    @NotNull(message = "Item ID is required")
    Long itemId,

    @NotBlank(message = "Change reason is required")
    String changeReason,

    String suggestedAmount,
    String notes
) {}

