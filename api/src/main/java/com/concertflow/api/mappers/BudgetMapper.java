package com.concertflow.api.mappers;

import com.concertflow.api.budget.dto.BudgetApprovalDashboardResponse;
import com.concertflow.api.budget.dto.BudgetApprovalResponse;
import com.concertflow.api.budget.dto.BudgetDetailResponse;
import com.concertflow.api.budget.dto.BudgetItemResponse;
import com.concertflow.api.budget.dto.BudgetStatistics;
import com.concertflow.api.budget.dto.BudgetValidation;
import com.concertflow.api.budget.dto.CategoryBreakdown;
import com.concertflow.api.concert.entity.BudgetApproval;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetItemStatus;
import com.concertflow.api.budget.config.BudgetApprovalConfig;
import com.concertflow.api.budget.config.BudgetConstants;
import com.concertflow.api.budget.service.BudgetCalculator;
import com.concertflow.api.concert.entity.BudgetStatus;
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
        String priority = BudgetCalculator.determinePriority(daysUntilConcert);
        BigDecimal submittedBudget = concert.getBudget() != null ? concert.getBudget() : BigDecimal.ZERO;
        BigDecimal estimatedBudget = BudgetCalculator.calculateEstimatedBudgetFromItems(concert);
        
        BigDecimal approvedBudget = (concert.getBudgetStatus() == BudgetStatus.APPROVED && concert.getBudget() != null)
            ? concert.getBudget()
            : null;

        return BudgetApprovalDashboardResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .estimatedBudget(estimatedBudget)
            .submittedBudget(submittedBudget)
            .approvedBudget(approvedBudget)
            .budgetStatus(concert.getBudgetStatus())
            .coordinatorName(concert.getCoordinator() != null
                ? concert.getCoordinator().getFirstName() + " " + concert.getCoordinator().getLastName()
                : "Unknown")
            .submittedAt(findLatestSubmissionDate(concert))
            .daysUntilConcert(daysUntilConcert)
            .hasComments(hasComments(concert))
            .approvalLevel(BudgetCalculator.determineApprovalLevel(submittedBudget))
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

        BudgetStatistics statistics = BudgetCalculator.calculateStatistics(concert);
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
        BigDecimal estimatedBudget = BudgetCalculator.calculateEstimatedBudgetFromItems(concert);

        return BudgetDetailResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .venue(concert.getVenue())
            .city(concert.getCity())
            .concertStatus(concert.getStatus().name())
            .budgetStatus(concert.getBudgetStatus())
            .estimatedBudget(estimatedBudget)
            .requestedBudget(requestedBudget)
            .approvedBudget(concert.getBudgetStatus() == BudgetStatus.APPROVED ? concert.getBudget() : BigDecimal.ZERO)
            .budgetDifference(BudgetCalculator.calculateBudgetDifference(concert))
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


    private int calculateDaysUntil(LocalDateTime date) {
        if (date == null) {
            return 0;
        }
        return (int) Duration.between(LocalDateTime.now(), date).toDays();
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


    private boolean requiresAttention(BudgetItem item) {
        return item.getIsMandatory() != null && item.getIsMandatory()
            && (item.getEstimatedAmount() == null || item.getEstimatedAmount().compareTo(BigDecimal.ZERO) <= 0);
    }
}

