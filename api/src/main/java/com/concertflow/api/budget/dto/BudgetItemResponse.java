package com.concertflow.api.budget.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record BudgetItemResponse(
    Long id,
    String category,
    String name,
    String description,
    BigDecimal estimatedAmount,
    BigDecimal requestedAmount,
    BigDecimal approvedAmount,
    String status,
    Boolean isMandatory,
    String notes,
    Boolean requiresAttention,
    List<BudgetItemApprovalResponse> approvals
) {}

