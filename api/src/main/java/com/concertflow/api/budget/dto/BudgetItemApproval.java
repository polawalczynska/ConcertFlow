package com.concertflow.api.budget.dto;

import com.concertflow.api.concert.entity.ApprovalDecision;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record BudgetItemApproval(
    @NotNull(message = "Item ID is required")
    Long itemId,

    @NotNull(message = "Decision is required")
    ApprovalDecision decision,

    @DecimalMin(value = "0.0", message = "Approved amount cannot be negative")
    BigDecimal approvedAmount,

    String comments
) {}

