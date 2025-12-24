package com.concertflow.api.budget.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record UpdateBudgetItemRequest(
    @NotBlank(message = "Category is required")
    String category,

    @NotBlank(message = "Name is required")
    String name,

    String description,

    @NotNull(message = "Estimated amount is required")
    @Positive(message = "Estimated amount must be positive")
    BigDecimal estimatedAmount,

    Boolean isMandatory,

    String notes
) {}

