package com.concertflow.api.budget.service;

import com.concertflow.api.budget.config.BudgetApprovalConfig;
import com.concertflow.api.concert.entity.ApprovalDecision;
import com.concertflow.api.concert.entity.Concert;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetFlagService {
    private final BudgetApprovalConfig config;

    public List<String> determineFlags(Concert concert) {
        List<String> flags = new ArrayList<>();

        if (exceedsBudgetThreshold(concert)) {
            flags.add("BUDGET_EXCEEDS_LIMIT");
        }

        if (hasUrgentDeadline(concert)) {
            flags.add("URGENT_DEADLINE");
        }

        if (hasPreviousRejections(concert)) {
            flags.add("PREVIOUSLY_REJECTED");
        }

        return flags;
    }

    private boolean exceedsBudgetThreshold(Concert concert) {
        return concert.getEstimatedBudget() != null &&
            concert.getEstimatedBudget().compareTo(config.BUDGET_THRESHOLD) > 0;
    }

    private boolean hasUrgentDeadline(Concert concert) {
        return concert.getDate() != null &&
            concert.getDate().isBefore(LocalDateTime.now().plusDays(config.URGENT_DEADLINE_DAYS));
    }

    private boolean hasPreviousRejections(Concert concert) {
        return concert.getBudgetApprovals().stream()
            .anyMatch(approval -> approval.getDecision() == ApprovalDecision.REJECTED);
    }
}

