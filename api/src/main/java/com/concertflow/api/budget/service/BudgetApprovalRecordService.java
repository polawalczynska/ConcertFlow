package com.concertflow.api.budget.service;

import com.concertflow.api.budget.config.BudgetApprovalConfig;
import com.concertflow.api.concert.entity.ApprovalDecision;
import com.concertflow.api.concert.entity.BudgetApproval;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BudgetApprovalRecordService {
    private final BudgetApprovalConfig config;

    public BudgetApproval createApprovalRecord(
        Concert concert,
        User user,
        ApprovalDecision decision,
        String comments
    ) {
        return BudgetApproval.builder()
            .concert(concert)
            .approverId(user.getId())
            .approverName(user.getFirstName() + " " + user.getLastName())
            .approverRole(user.getRole().name())
            .decision(decision)
            .comments(comments)
            .decisionDate(LocalDateTime.now())
            .approvalLevel(determineApprovalLevel(concert.getEstimatedBudget()))
            .build();
    }

    private Integer determineApprovalLevel(BigDecimal budgetAmount) {
        if (budgetAmount == null) {
            return 1;
        }
        if (budgetAmount.compareTo(config.HIGH_APPROVAL_LEVEL_THRESHOLD) > 0) {
            return 3;
        } else if (budgetAmount.compareTo(config.MEDIUM_APPROVAL_LEVEL_THRESHOLD) > 0) {
            return 2;
        }
        return 1;
    }
}

