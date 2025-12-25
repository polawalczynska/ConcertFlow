package com.concertflow.api.budget.service;

import com.concertflow.api.budget.config.BudgetApprovalConfig;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.exceptions.types.InvalidBudgetStatusException;
import com.concertflow.api.exceptions.types.InvalidConcertStatusException;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class BudgetAccessValidator {
    private final BudgetApprovalConfig config;

    public void validateBudgetManagerAccess(Concert concert, User budgetManager) {
        if (concert.getBudgetManager() == null ||
            !concert.getBudgetManager().getId().equals(budgetManager.getId())) {
            throw new UnauthorizedAccessException("You are not assigned to this concert");
        }
    }

    public void validateBudgetManagerAccessById(Concert concert, Long budgetManagerId) {
        if (concert.getBudgetManager() == null ||
            !concert.getBudgetManager().getId().equals(budgetManagerId)) {
            throw new UnauthorizedAccessException("You are not assigned to this concert");
        }
    }

    public void validateBudgetManagerIdMatchesUser(Long budgetManagerId, User authenticatedUser) {
        if (!authenticatedUser.getId().equals(budgetManagerId)) {
            throw new UnauthorizedAccessException("You can only access your own budget approvals");
        }
    }

    public void validateBudgetForApproval(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.SUBMITTED &&
            concert.getBudgetStatus() != BudgetStatus.UNDER_REVIEW) {
            throw new InvalidBudgetStatusException("Budget is not in approvable state");
        }

        if (concert.getStatus() != ConcertStatus.PLANNING) {
            throw new InvalidConcertStatusException("Only planned concerts can have budgets approved");
        }

        if (concert.getEstimatedBudget() == null ||
            concert.getEstimatedBudget().compareTo(BigDecimal.ZERO) <= 0) {
            throw new com.concertflow.api.exceptions.types.BudgetValidationException(
                "Budget must be greater than 0");
        }
    }

    public void validateBudgetForSubmission(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.PENDING &&
            concert.getBudgetStatus() != BudgetStatus.REVISION_REQUESTED) {
            throw new InvalidBudgetStatusException("Budget is not ready for submission");
        }

        if (concert.getStatus() != ConcertStatus.PLANNING) {
            throw new InvalidConcertStatusException("Only planned concerts can submit budgets");
        }

        validateMandatoryItems(concert);
    }

    private void validateMandatoryItems(Concert concert) {
        var mandatoryItemsWithoutAmount = concert.getBudgetItems().stream()
            .filter(item -> item.getIsMandatory() != null && item.getIsMandatory())
            .filter(item -> item.getEstimatedAmount() == null ||
                item.getEstimatedAmount().compareTo(BigDecimal.ZERO) <= 0)
            .toList();

        if (!mandatoryItemsWithoutAmount.isEmpty()) {
            throw new com.concertflow.api.exceptions.types.BudgetValidationException(
                "All mandatory budget items must have estimated amounts: " +
                    mandatoryItemsWithoutAmount.stream()
                        .map(item -> item.getName() != null ? item.getName() : "Unnamed")
                        .toList()
            );
        }
    }
}

