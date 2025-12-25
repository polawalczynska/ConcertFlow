package com.concertflow.api.budget.dto;

import com.concertflow.api.concert.entity.ApprovalDecision;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record ApproveBudgetRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotNull(message = "Budget version is required")
    Integer budgetVersion,

    @NotNull(message = "Approved budget is required")
    @Positive(message = "Approved budget must be greater than zero")
    BigDecimal approvedBudget,

    List<BudgetItemApproval> itemApprovals
) {}

