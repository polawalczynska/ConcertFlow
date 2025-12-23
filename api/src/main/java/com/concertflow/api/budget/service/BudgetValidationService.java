package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.BudgetValidation;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BudgetValidationService {
    private final BudgetApprovalConfig config;

    public List<BudgetValidation> validateBudget(Concert concert) {
        List<BudgetValidation> validations = new ArrayList<>();

        validateBudgetAmount(concert, validations);
        validateBudgetItems(concert, validations);
        validateBudgetStatus(concert, validations);
        validateBudgetCompleteness(concert, validations);

        return validations;
    }

    private void validateBudgetAmount(Concert concert, List<BudgetValidation> validations) {
        BigDecimal estimatedBudget = concert.getEstimatedBudget();

        if (estimatedBudget == null || estimatedBudget.compareTo(BigDecimal.ZERO) <= 0) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_ZERO_OR_NEGATIVE")
                .message("Budget must be greater than zero")
                .severity("ERROR")
                .passed(false)
                .details("Estimated budget is zero or negative")
                .build());
            return;
        }

        if (estimatedBudget.compareTo(config.MIN_BUDGET) < 0) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_BELOW_MINIMUM")
                .message("Budget is below minimum threshold of " + config.MIN_BUDGET)
                .severity("ERROR")
                .passed(false)
                .details("Minimum budget is " + config.MIN_BUDGET)
                .build());
        }

        if (estimatedBudget.compareTo(config.MAX_BUDGET) > 0) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_EXCEEDS_MAXIMUM")
                .message("Budget exceeds maximum threshold of " + config.MAX_BUDGET)
                .severity("WARNING")
                .passed(false)
                .details("Budget exceeds maximum allowed amount")
                .build());
        }

        if (estimatedBudget.compareTo(config.BUDGET_THRESHOLD) > 0) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_EXCEEDS_THRESHOLD")
                .message("Budget exceeds standard threshold and requires higher approval level")
                .severity("INFO")
                .passed(true)
                .details("Budget exceeds " + config.BUDGET_THRESHOLD + " threshold")
                .build());
        }
    }

    private void validateBudgetItems(Concert concert, List<BudgetValidation> validations) {
        List<BudgetItem> items = concert.getBudgetItems();

        if (items == null || items.isEmpty()) {
            validations.add(BudgetValidation.builder()
                .code("NO_BUDGET_ITEMS")
                .message("Budget must contain at least one item")
                .severity("ERROR")
                .passed(false)
                .details("No budget items found")
                .build());
            return;
        }

        long mandatoryItemsWithoutAmount = items.stream()
            .filter(BudgetItem::getIsMandatory)
            .filter(item -> item.getEstimatedAmount() == null ||
                item.getEstimatedAmount().compareTo(BigDecimal.ZERO) <= 0)
            .count();

        if (mandatoryItemsWithoutAmount > 0) {
            validations.add(BudgetValidation.builder()
                .code("MANDATORY_ITEMS_MISSING_AMOUNTS")
                .message(mandatoryItemsWithoutAmount + " mandatory items are missing estimated amounts")
                .severity("ERROR")
                .passed(false)
                .details("All mandatory items must have estimated amounts")
                .build());
        }

        BigDecimal totalItemsAmount = items.stream()
            .map(BudgetItem::getEstimatedAmount)
            .filter(amount -> amount != null && amount.compareTo(BigDecimal.ZERO) > 0)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalItemsAmount.compareTo(concert.getEstimatedBudget()) > 0) {
            validations.add(BudgetValidation.builder()
                .code("ITEMS_EXCEED_BUDGET")
                .message("Sum of budget items exceeds total estimated budget")
                .severity("WARNING")
                .passed(false)
                .details("Items total: " + totalItemsAmount + ", Budget: " + concert.getEstimatedBudget())
                .build());
        }
    }

    private void validateBudgetStatus(Concert concert, List<BudgetValidation> validations) {
        if (concert.getBudgetStatus() == null) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_STATUS_MISSING")
                .message("Budget status is not set")
                .severity("ERROR")
                .passed(false)
                .details("Budget status must be set")
                .build());
        } else if (concert.getBudgetStatus() == BudgetStatus.REJECTED) {
            validations.add(BudgetValidation.builder()
                .code("BUDGET_PREVIOUSLY_REJECTED")
                .message("Budget was previously rejected")
                .severity("WARNING")
                .passed(true)
                .details("Budget has been rejected and may need revision")
                .build());
        }
    }

    private void validateBudgetCompleteness(Concert concert, List<BudgetValidation> validations) {
        if (concert.getEstimatedBudget() == null) {
            validations.add(BudgetValidation.builder()
                .code("ESTIMATED_BUDGET_MISSING")
                .message("Estimated budget is required")
                .severity("ERROR")
                .passed(false)
                .details("Estimated budget must be set")
                .build());
        }

        if (concert.getBudgetItems() == null || concert.getBudgetItems().isEmpty()) {
            return;
        }

        long itemsWithoutCategory = concert.getBudgetItems().stream()
            .filter(item -> item.getCategory() == null || item.getCategory().isBlank())
            .count();

        if (itemsWithoutCategory > 0) {
            validations.add(BudgetValidation.builder()
                .code("ITEMS_MISSING_CATEGORY")
                .message(itemsWithoutCategory + " items are missing category")
                .severity("WARNING")
                .passed(false)
                .details("All items should have a category assigned")
                .build());
        }
    }
}

