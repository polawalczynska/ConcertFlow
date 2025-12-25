package com.concertflow.api.budget.dto;

import com.concertflow.api.concert.entity.ApprovalDecision;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record ApproveBudgetRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotNull(message = "Budget version is required")
    Integer budgetVersion,

    List<BudgetItemApproval> itemApprovals
) {}

