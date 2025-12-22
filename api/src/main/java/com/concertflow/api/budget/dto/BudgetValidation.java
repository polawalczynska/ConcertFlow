package com.concertflow.api.budget.dto;

import lombok.Builder;

@Builder
public record BudgetValidation(
    String code,
    String message,
    String severity,
    Boolean passed,
    String details
) {}

