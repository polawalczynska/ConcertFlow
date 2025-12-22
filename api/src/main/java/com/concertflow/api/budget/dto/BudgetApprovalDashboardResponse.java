package com.concertflow.api.budget.dto;

import com.concertflow.api.concert.entity.BudgetStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BudgetApprovalDashboardResponse(
    Long concertId,
    String concertName,
    String artistName,
    LocalDateTime concertDate,
    BigDecimal estimatedBudget,
    BigDecimal submittedBudget,
    BudgetStatus budgetStatus,
    String coordinatorName,
    LocalDateTime submittedAt,
    Integer daysUntilConcert,
    Boolean hasComments,
    Integer approvalLevel,
    List<String> flags,
    String priority
) {}

