package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.*;
import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.*;
import com.concertflow.api.mappers.BudgetMapper;
import com.concertflow.api.notification.service.NotificationService;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BudgetApprovalService {
    private static final BigDecimal BUDGET_THRESHOLD = new BigDecimal("100000");
    private static final BigDecimal MIN_BUDGET = new BigDecimal("1000");
    private final ConcertRepository concertRepository;
    private final BudgetValidationService validationService;
    private final NotificationService notificationService;
    private final BudgetMapper budgetMapper;

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public Page<BudgetApprovalDashboardResponse> getPendingBudgets(Pageable pageable) {
        log.debug("Fetching pending budgets for approval");

        Page<Concert> concerts = concertRepository.findByBudgetStatusAndStatus(
            BudgetStatus.SUBMITTED,
            ConcertStatus.PLANNING,
            pageable
        );

        return concerts.map(concert -> {
            List<String> flags = new ArrayList<>();

            if (concert.getEstimatedBudget() != null &&
                concert.getEstimatedBudget().compareTo(BUDGET_THRESHOLD) > 0) {
                flags.add("BUDGET_EXCEEDS_LIMIT");
            }

            if (hasUrgentDeadline(concert)) {
                flags.add("URGENT_DEADLINE");
            }

            if (hasPreviousRejections(concert)) {
                flags.add("PREVIOUSLY_REJECTED");
            }

            return budgetMapper.toDashboardResponse(concert, flags);
        });
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public BudgetDetailResponse getBudgetDetails(Long concertId) {
        log.debug("Fetching budget details for concert: {}", concertId);

        Concert concert = concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));

        if (concert.getBudgetStatus() != BudgetStatus.SUBMITTED &&
            concert.getBudgetStatus() != BudgetStatus.UNDER_REVIEW) {
            throw new InvalidBudgetStatusException("Budget is not submitted for approval");
        }

        List<BudgetValidation> validations = validationService.validateBudget(concert);
        boolean isEligible = validations.stream()
            .noneMatch(v -> "ERROR".equals(v.severity()));

        return budgetMapper.toDetailResponse(concert, validations, isEligible);
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void approveBudget(Long concertId, ApproveBudgetRequest request, User approver) {
        log.info("Approving budget for concert: {}, approver: {}", concertId, approver.getEmail());

        Concert concert = concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));

        validateBudgetForApproval(concert);

        if (!concert.getBudgetVersion().equals(request.budgetVersion())) {
            throw new BudgetVersionConflictException("Budget has been modified. Please refresh.");
        }

        if (request.itemApprovals() != null && !request.itemApprovals().isEmpty()) {
            approveBudgetItems(concert, request.itemApprovals());
        }

        concert.setBudgetStatus(BudgetStatus.APPROVED);
        concert.setBudgetApprovedAt(LocalDateTime.now());
        concert.setBudgetApprovedById(approver.getId());
        concert.setApprovedBudget(calculateTotalApprovedBudget(concert));

        BudgetApproval approval = createApprovalRecord(
            concert,
            approver,
            ApprovalDecision.APPROVED,
            request.comments()
        );
        concert.getBudgetApprovals().add(approval);

        concertRepository.save(concert);

        notificationService.sendBudgetApprovedNotification(concert, approver);

        log.info("Budget approved for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void rejectBudget(Long concertId, RejectBudgetRequest request, User rejector) {
        log.info("Rejecting budget for concert: {}, rejector: {}", concertId, rejector.getEmail());

        Concert concert = concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));

        validateBudgetForRejection(concert);

        concert.setBudgetStatus(BudgetStatus.REJECTED);
        concert.setBudgetRejectionReason(request.rejectionReason());

        BudgetApproval rejection = createApprovalRecord(
            concert,
            rejector,
            ApprovalDecision.REJECTED,
            request.rejectionReason() + (request.suggestions() != null ? "\nSugestie: " + request.suggestions() : "")
        );
        concert.getBudgetApprovals().add(rejection);

        concertRepository.save(concert);

        notificationService.sendBudgetRejectedNotification(concert, rejector, request.rejectionReason());

        log.info("Budget rejected for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void requestRevision(Long concertId, RequestBudgetRevisionRequest request, User requester) {
        log.info("Requesting budget revision for concert: {}", concertId);

        Concert concert = concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));

        concert.setBudgetStatus(BudgetStatus.REVISION_REQUESTED);

        BudgetApproval revisionRequest = createApprovalRecord(
            concert,
            requester,
            ApprovalDecision.RETURNED_FOR_REVISION,
            request.revisionReason() + "\nDeadline: " + request.deadline()
        );
        revisionRequest.setRequiresRevision(true);
        concert.getBudgetApprovals().add(revisionRequest);

        StringBuilder revisionNotes = new StringBuilder();
        revisionNotes.append("Wymagane poprawki:\n");
        for (RevisionItem item : request.requiredChanges()) {
            revisionNotes.append("- Pozycja ID: ").append(item.itemId())
                .append(", Powód: ").append(item.changeReason())
                .append("\n");
        }
        revisionNotes.append("Termin poprawki: ").append(request.deadline());

        concert.setBudgetRejectionReason(revisionNotes.toString());

        concertRepository.save(concert);

        notificationService.sendBudgetRevisionRequestedNotification(concert, requester, request);

        log.info("Budget revision requested for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN') or hasRole('ORGANIZER')")
    public void submitBudgetForApproval(Long concertId, SubmitBudgetForApprovalRequest request, User submitter) {
        log.info("Submitting budget for approval, concert: {}, submitter: {}", concertId, submitter.getEmail());

        Concert concert = concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));

        validateBudgetForSubmission(concert);

        concert.setBudgetStatus(BudgetStatus.SUBMITTED);
        concert.setBudgetVersion(concert.getBudgetVersion() + 1);

        concertRepository.save(concert);

        notificationService.sendBudgetSubmittedNotification(concert, submitter);

        log.info("Budget submitted for approval, concert: {}", concertId);
    }

    private void validateBudgetForApproval(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.SUBMITTED &&
            concert.getBudgetStatus() != BudgetStatus.UNDER_REVIEW) {
            throw new InvalidBudgetStatusException("Budget is not in approvable state");
        }

        if (concert.getStatus() != ConcertStatus.PLANNING) {
            throw new InvalidConcertStatusException("Only planned concerts can have budgets approved");
        }

        if (concert.getEstimatedBudget() == null ||
            concert.getEstimatedBudget().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BudgetValidationException("Budget must be greater than 0");
        }

        if (concert.getEstimatedBudget().compareTo(MIN_BUDGET) < 0) {
            throw new BudgetValidationException("Minimum budget is " + MIN_BUDGET);
        }
    }

    private void validateBudgetForRejection(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.SUBMITTED &&
            concert.getBudgetStatus() != BudgetStatus.UNDER_REVIEW) {
            throw new InvalidBudgetStatusException("Budget is not in rejectable state");
        }
    }

    private void validateBudgetForSubmission(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.PENDING &&
            concert.getBudgetStatus() != BudgetStatus.REVISION_REQUESTED) {
            throw new InvalidBudgetStatusException("Budget is not ready for submission");
        }

        if (concert.getStatus() != ConcertStatus.PLANNING) {
            throw new InvalidConcertStatusException("Only planned concerts can submit budgets");
        }

        List<BudgetItem> mandatoryItems = concert.getBudgetItems().stream()
            .filter(item -> item.getIsMandatory() != null && item.getIsMandatory())
            .filter(item -> item.getEstimatedAmount() == null ||
                item.getEstimatedAmount().compareTo(BigDecimal.ZERO) <= 0)
            .toList();

        if (!mandatoryItems.isEmpty()) {
            throw new BudgetValidationException(
                "All mandatory budget items must have estimated amounts: " +
                    mandatoryItems.stream().map(BudgetItem::getName).toList()
            );
        }
    }

    private void approveBudgetItems(Concert concert, List<BudgetItemApproval> itemApprovals) {
        for (BudgetItemApproval itemApproval : itemApprovals) {
            BudgetItem item = concert.getBudgetItems().stream()
                .filter(i -> i.getId().equals(itemApproval.itemId()))
                .findFirst()
                .orElseThrow(() -> new BudgetItemNotFoundException(
                    "Budget item not found: " + itemApproval.itemId()));

            item.setStatus(BudgetItemStatus.APPROVED);
            item.setApprovedAmount(itemApproval.approvedAmount());

            if (itemApproval.comments() != null && !itemApproval.comments().isBlank()) {
                item.setNotes((item.getNotes() != null ? item.getNotes() + "\n" : "") +
                    "Approval: " + itemApproval.comments());
            }
        }
    }

    private BigDecimal calculateTotalApprovedBudget(Concert concert) {
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getApprovedAmount)
            .filter(amount -> amount != null && amount.compareTo(BigDecimal.ZERO) > 0)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BudgetApproval createApprovalRecord(
        Concert concert, User user,
        ApprovalDecision decision, String comments
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
        if (budgetAmount.compareTo(new BigDecimal("50000")) > 0) {
            return 3;
        } else if (budgetAmount.compareTo(new BigDecimal("20000")) > 0) {
            return 2;
        }
        return 1;
    }

    private boolean hasUrgentDeadline(Concert concert) {
        return concert.getDate() != null &&
            concert.getDate().isBefore(LocalDateTime.now().plusDays(7));
    }

    private boolean hasPreviousRejections(Concert concert) {
        return concert.getBudgetApprovals().stream()
            .anyMatch(approval -> approval.getDecision() == ApprovalDecision.REJECTED);
    }
}

