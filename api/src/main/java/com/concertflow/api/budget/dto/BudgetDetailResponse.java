package com.concertflow.api.budget.dto;

import com.concertflow.api.concert.entity.BudgetStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BudgetDetailResponse(
    Long concertId,
    String concertName,
    String artistName,
    LocalDateTime concertDate,
    String venue,
    String city,
    String concertStatus,
    BudgetStatus budgetStatus,
    BigDecimal estimatedBudget,
    BigDecimal requestedBudget,
    BigDecimal approvedBudget,
    BigDecimal budgetDifference,
    List<BudgetItemResponse> budgetItems,
    List<BudgetApprovalResponse> approvalHistory,
    BudgetStatistics statistics,
    LocalDateTime createdAt,
    LocalDateTime lastUpdated,
    String coordinatorEmail,
    String coordinatorPhone,
    List<BudgetValidation> validations,
    Boolean isEligibleForApproval,
    Integer budgetVersion
) {}

