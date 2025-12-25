package com.concertflow.api.concert.service;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class BudgetManagerChangeHandler {

    public void handleBudgetManagerChange(Concert concert, User newBudgetManager) {
        if (!hasBudgetManagerChanged(concert, newBudgetManager)) {
            return;
        }

        if (shouldResetBudgetStatus(concert)) {
            resetBudgetStatus(concert);
        }
    }

    private boolean hasBudgetManagerChanged(Concert concert, User newBudgetManager) {
        User currentBudgetManager = concert.getBudgetManager();
        
        return (currentBudgetManager == null && newBudgetManager != null) ||
            (currentBudgetManager != null && newBudgetManager == null) ||
            (currentBudgetManager != null && newBudgetManager != null &&
                !currentBudgetManager.getId().equals(newBudgetManager.getId()));
    }

    private boolean shouldResetBudgetStatus(Concert concert) {
        BudgetStatus status = concert.getBudgetStatus();
        return status == BudgetStatus.APPROVED ||
            status == BudgetStatus.SUBMITTED ||
            status == BudgetStatus.UNDER_REVIEW;
    }

    private void resetBudgetStatus(Concert concert) {
        concert.setBudgetStatus(BudgetStatus.PENDING);
    }
}

