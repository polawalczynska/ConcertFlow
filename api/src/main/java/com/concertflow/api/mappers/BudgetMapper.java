package com.concertflow.api.mappers;

import com.concertflow.api.budget.dto.*;
import com.concertflow.api.concert.entity.BudgetApproval;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetItemStatus;
import com.concertflow.api.concert.entity.Concert;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BudgetMapper {
    public BudgetApprovalDashboardResponse toDashboardResponse(Concert concert, List<String> flags) {
        int daysUntilConcert = calculateDaysUntil(concert.getDate());
        String priority = determinePriority(concert, daysUntilConcert);
        BigDecimal submittedBudget = concert.getBudget() != null ? concert.getBudget() : BigDecimal.ZERO;
        BigDecimal estimatedBudget = calculateEstimatedBudgetFromItems(concert);

        return BudgetApprovalDashboardResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .estimatedBudget(estimatedBudget)
            .submittedBudget(submittedBudget)
            .budgetStatus(concert.getBudgetStatus())
            .coordinatorName(concert.getCoordinator() != null
                ? concert.getCoordinator().getFirstName() + " " + concert.getCoordinator().getLastName()
                : "Unknown")
            .submittedAt(findLatestSubmissionDate(concert))
            .daysUntilConcert(daysUntilConcert)
            .hasComments(hasComments(concert))
            .approvalLevel(determineApprovalLevel(submittedBudget))
            .flags(flags != null ? flags : new ArrayList<>())
            .priority(priority)
            .build();
    }

    public BudgetDetailResponse toDetailResponse(Concert concert, List<BudgetValidation> validations, boolean isEligible) {
        List<BudgetItemResponse> budgetItems = concert.getBudgetItems().stream()
            .map(this::toBudgetItemResponse)
            .collect(Collectors.toList());

        List<BudgetApprovalResponse> approvalHistory = concert.getBudgetApprovals().stream()
            .map(this::toBudgetApprovalResponse)
            .collect(Collectors.toList());

        BudgetStatistics statistics = calculateStatistics(concert);
        BigDecimal requestedBudget;
        if (concert.getBudgetStatus() == BudgetStatus.SUBMITTED ||
            concert.getBudgetStatus() == BudgetStatus.UNDER_REVIEW ||
            concert.getBudgetStatus() == BudgetStatus.APPROVED ||
            concert.getBudgetStatus() == BudgetStatus.REJECTED ||
            concert.getBudgetStatus() == BudgetStatus.REVISION_REQUESTED) {
            requestedBudget = concert.getSubmittedBudget() != null ? concert.getSubmittedBudget() : BigDecimal.ZERO;
        } else {
            requestedBudget = concert.getBudget() != null ? concert.getBudget() : BigDecimal.ZERO;
        }
        BigDecimal estimatedBudget = calculateEstimatedBudgetFromItems(concert);

        return BudgetDetailResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .venue(concert.getVenue())
            .city(extractCity(concert.getVenue()))
            .concertStatus(concert.getStatus().name())
            .budgetStatus(concert.getBudgetStatus())
            .estimatedBudget(estimatedBudget)
            .requestedBudget(requestedBudget)
            .approvedBudget(concert.getApprovedBudget())
            .budgetDifference(calculateBudgetDifference(concert))
            .budgetItems(budgetItems)
            .approvalHistory(approvalHistory)
            .statistics(statistics)
            .createdAt(concert.getCreatedAt())
            .lastUpdated(concert.getUpdatedAt())
            .coordinatorEmail(concert.getCoordinator() != null ? concert.getCoordinator().getEmail() : null)
            .coordinatorPhone(null)
            .validations(validations != null ? validations : new ArrayList<>())
            .isEligibleForApproval(isEligible)
            .budgetVersion(concert.getBudgetVersion())
            .build();
    }

    public BudgetItemResponse toBudgetItemResponse(BudgetItem item) {
        return BudgetItemResponse.builder()
            .id(item.getId())
            .category(item.getCategory())
            .name(item.getName())
            .description(item.getDescription())
            .estimatedAmount(item.getEstimatedAmount())
            .requestedAmount(item.getEstimatedAmount())
            .approvedAmount(item.getApprovedAmount())
            .status(item.getStatus() != null ? item.getStatus().name() : null)
            .isMandatory(item.getIsMandatory())
            .notes(item.getNotes())
            .requiresAttention(requiresAttention(item))
            .approvals(new ArrayList<>())
            .build();
    }

    private BudgetApprovalResponse toBudgetApprovalResponse(BudgetApproval approval) {
        return BudgetApprovalResponse.builder()
            .id(approval.getId())
            .approverName(approval.getApproverName())
            .approverRole(approval.getApproverRole())
            .decision(approval.getDecision() != null ? approval.getDecision().getDisplayName() : null)
            .comments(approval.getComments())
            .decisionDate(approval.getDecisionDate())
            .approvalLevel(approval.getApprovalLevel())
            .requiresRevision(approval.getRequiresRevision())
            .build();
    }

    private BudgetStatistics calculateStatistics(Concert concert) {
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
                .categoryBreakdown(new ArrayList<>())
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

        BigDecimal totalEstimated = items.stream()
            .map(BudgetItem::getEstimatedAmount)
            .filter(amount -> amount != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalRequested = totalEstimated;
        BigDecimal totalApproved = items.stream()
            .map(BudgetItem::getApprovedAmount)
            .filter(amount -> amount != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

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

    private int calculateDaysUntil(LocalDateTime date) {
        if (date == null) {
            return 0;
        }
        return (int) Duration.between(LocalDateTime.now(), date).toDays();
    }

    private String determinePriority(Concert concert, int daysUntil) {
        if (daysUntil < 7) {
            return "HIGH";
        } else if (daysUntil < 30) {
            return "MEDIUM";
        }
        return "LOW";
    }

    private LocalDateTime findLatestSubmissionDate(Concert concert) {
        if (concert.getBudgetApprovals() == null || concert.getBudgetApprovals().isEmpty()) {
            return concert.getCreatedAt();
        }
        return concert.getBudgetApprovals().stream()
            .filter(approval -> approval.getDecisionDate() != null)
            .map(BudgetApproval::getDecisionDate)
            .max(LocalDateTime::compareTo)
            .orElse(concert.getCreatedAt());
    }

    private boolean hasComments(Concert concert) {
        return concert.getBudgetApprovals().stream()
            .anyMatch(approval -> approval.getComments() != null && !approval.getComments().isBlank());
    }

    private Integer determineApprovalLevel(BigDecimal budgetAmount) {
        if (budgetAmount == null) {
            return 1;
        }
        if (budgetAmount.compareTo(new BigDecimal("50000")) > 0) {
            return 3;
        } else if (budgetAmount.compareTo(new BigDecimal("20000")) > 0) {
            return 2;
        }
        return 1;
    }

    private String extractCity(String venue) {
        return venue != null && venue.contains(",") ? venue.split(",")[1].trim() : venue;
    }

    private BigDecimal calculateBudgetDifference(Concert concert) {
        BigDecimal estimatedBudget = calculateEstimatedBudgetFromItems(concert);
        if (estimatedBudget == null || concert.getApprovedBudget() == null) {
            return BigDecimal.ZERO;
        }
        return concert.getApprovedBudget().subtract(estimatedBudget);
    }

    private BigDecimal calculateEstimatedBudgetFromItems(Concert concert) {
        if (concert.getBudgetItems() == null || concert.getBudgetItems().isEmpty()) {
            return BigDecimal.ZERO;
        }
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getEstimatedAmount)
            .filter(amount -> amount != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private boolean requiresAttention(BudgetItem item) {
        return item.getIsMandatory() != null && item.getIsMandatory()
            && (item.getEstimatedAmount() == null || item.getEstimatedAmount().compareTo(BigDecimal.ZERO) <= 0);
    }
}

