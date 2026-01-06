package com.concertflow.api.budget.service;

import com.concertflow.api.budget.config.BudgetApprovalConfig;
import com.concertflow.api.budget.config.BudgetConstants;
import com.concertflow.api.budget.dto.BudgetStatistics;
import com.concertflow.api.budget.dto.CategoryBreakdown;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetItemStatus;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class BudgetCalculator {

    public BudgetStatistics calculateStatistics(Concert concert) {
        List<BudgetItem> items = concert.getBudgetItems();
        
        if (items == null || items.isEmpty()) {
            return BudgetStatistics.builder()
                .totalItems(0)
                .approvedItems(0)
                .pendingItems(0)
                .rejectedItems(0)
                .totalEstimated(BigDecimal.ZERO)
                .totalRequested(BigDecimal.ZERO)
                .totalApproved(BigDecimal.ZERO)
                .approvalRate(BigDecimal.ZERO)
                .variance(BigDecimal.ZERO)
                .categoryBreakdown(List.of())
                .build();
        }

        int totalItems = items.size();
        int approvedItems = (int) items.stream()
            .filter(item -> item.getStatus() == BudgetItemStatus.APPROVED)
            .count();
        int pendingItems = (int) items.stream()
            .filter(item -> item.getStatus() == BudgetItemStatus.PENDING_APPROVAL)
            .count();
        int rejectedItems = (int) items.stream()
            .filter(item -> item.getStatus() == BudgetItemStatus.CANCELLED)
            .count();

        BigDecimal totalEstimated = calculateEstimatedBudgetFromItems(concert);
        BigDecimal totalRequested = totalEstimated;
        BigDecimal totalApproved = calculateApprovedBudgetFromItems(concert);

        BigDecimal approvalRate = totalEstimated.compareTo(BigDecimal.ZERO) > 0
            ? totalApproved.divide(totalEstimated, 4, java.math.RoundingMode.HALF_UP)
            .multiply(new BigDecimal("100"))
            : BigDecimal.ZERO;

        BigDecimal variance = totalApproved.subtract(totalEstimated);
        List<CategoryBreakdown> categoryBreakdown = calculateCategoryBreakdown(items, totalEstimated);

        return BudgetStatistics.builder()
            .totalItems(totalItems)
            .approvedItems(approvedItems)
            .pendingItems(pendingItems)
            .rejectedItems(rejectedItems)
            .totalEstimated(totalEstimated)
            .totalRequested(totalRequested)
            .totalApproved(totalApproved)
            .approvalRate(approvalRate)
            .variance(variance)
            .categoryBreakdown(categoryBreakdown)
            .build();
    }

    public BigDecimal calculateEstimatedBudgetFromItems(Concert concert) {
        if (concert.getBudgetItems() == null || concert.getBudgetItems().isEmpty()) {
            return BigDecimal.ZERO;
        }
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getEstimatedAmount)
            .filter(amount -> amount != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateApprovedBudgetFromItems(Concert concert) {
        if (concert.getBudgetItems() == null || concert.getBudgetItems().isEmpty()) {
            return BigDecimal.ZERO;
        }
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getApprovedAmount)
            .filter(amount -> amount != null && amount.compareTo(BigDecimal.ZERO) > 0)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateBudgetDifference(Concert concert) {
        BigDecimal estimatedBudget = calculateEstimatedBudgetFromItems(concert);
        if (estimatedBudget == null) {
            return BigDecimal.ZERO;
        }
        
        if (concert.getBudgetStatus() != BudgetStatus.APPROVED || concert.getBudget() == null) {
            return BigDecimal.ZERO;
        }
        
        return concert.getBudget().subtract(estimatedBudget);
    }

    public String determinePriority(int daysUntil) {
        if (daysUntil < BudgetApprovalConfig.HIGH_PRIORITY_DAYS) {
            return BudgetConstants.PRIORITY_HIGH;
        } else if (daysUntil < BudgetApprovalConfig.MEDIUM_PRIORITY_DAYS) {
            return BudgetConstants.PRIORITY_MEDIUM;
        }
        return BudgetConstants.PRIORITY_LOW;
    }

    public Integer determineApprovalLevel(BigDecimal budgetAmount) {
        if (budgetAmount == null) {
            return 1;
        }
        if (budgetAmount.compareTo(BudgetApprovalConfig.HIGH_APPROVAL_LEVEL_THRESHOLD) > 0) {
            return 3;
        } else if (budgetAmount.compareTo(BudgetApprovalConfig.MEDIUM_APPROVAL_LEVEL_THRESHOLD) > 0) {
            return 2;
        }
        return 1;
    }

    private List<CategoryBreakdown> calculateCategoryBreakdown(List<BudgetItem> items, BigDecimal total) {
        return items.stream()
            .collect(Collectors.groupingBy(
                BudgetItem::getCategory,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    itemList -> {
                        String category = itemList.isEmpty() ? null : itemList.get(0).getCategory();
                        int itemCount = itemList.size();
                        BigDecimal estimatedAmount = itemList.stream()
                            .map(BudgetItem::getEstimatedAmount)
                            .filter(amount -> amount != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                        BigDecimal approvedAmount = itemList.stream()
                            .map(BudgetItem::getApprovedAmount)
                            .filter(amount -> amount != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                        BigDecimal percentage = total.compareTo(BigDecimal.ZERO) > 0
                            ? estimatedAmount.divide(total, 4, java.math.RoundingMode.HALF_UP)
                            .multiply(new BigDecimal("100"))
                            : BigDecimal.ZERO;
                        return CategoryBreakdown.builder()
                            .category(category)
                            .itemCount(itemCount)
                            .estimatedAmount(estimatedAmount)
                            .approvedAmount(approvedAmount)
                            .percentageOfTotal(percentage)
                            .build();
                    }
                )
            ))
            .values().stream()
            .collect(Collectors.toList());
    }
}

