package com.concertflow.api.budget.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record BudgetItemApprovalResponse(
    Long id,
    String approverName,
    String decision,
    BigDecimal approvedAmount,
    String comments,
    LocalDateTime decisionDate
) {}

