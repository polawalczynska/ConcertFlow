package com.concertflow.api.budget.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record BudgetApprovalResponse(
    Long id,
    String approverName,
    String approverRole,
    String decision,
    String comments,
    LocalDateTime decisionDate,
    Integer approvalLevel,
    Boolean requiresRevision
) {}

