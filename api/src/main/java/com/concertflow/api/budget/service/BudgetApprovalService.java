package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.*;
import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.BudgetVersionConflictException;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
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
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BudgetApprovalService {
    private final ConcertRepository concertRepository;
    private final BudgetValidationService validationService;
    private final NotificationService notificationService;
    private final BudgetMapper budgetMapper;
    private final BudgetFlagService flagService;
    private final BudgetAccessValidator accessValidator;
    private final BudgetApprovalRecordService approvalRecordService;
    private final BudgetItemService budgetItemService;
    private final BudgetRevisionNoteBuilder revisionNoteBuilder;

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public Page<BudgetApprovalDashboardResponse> getPendingBudgets(Pageable pageable, Long budgetManagerId, User authenticatedUser) {
        log.debug("Fetching pending budgets for approval, budget manager ID: {}", budgetManagerId);

        accessValidator.validateBudgetManagerIdMatchesUser(budgetManagerId, authenticatedUser);

        Page<Concert> concerts = concertRepository.findByBudgetStatusAndStatusAndBudgetManagerId(
            BudgetStatus.SUBMITTED,
            ConcertStatus.PLANNING,
            budgetManagerId,
            pageable
        );

        return concerts.map(concert -> {
            List<String> flags = flagService.determineFlags(concert);
            return budgetMapper.toDashboardResponse(concert, flags);
        });
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public BudgetDetailResponse getBudgetDetails(Long concertId, Long budgetManagerId, User authenticatedUser) {
        log.debug("Fetching budget details for concert: {}, budget manager ID: {}", concertId, budgetManagerId);

        accessValidator.validateBudgetManagerIdMatchesUser(budgetManagerId, authenticatedUser);

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetManagerAccessById(concert, budgetManagerId);

        if (concert.getBudgetStatus() != BudgetStatus.SUBMITTED &&
            concert.getBudgetStatus() != BudgetStatus.UNDER_REVIEW) {
            throw new com.concertflow.api.exceptions.types.InvalidBudgetStatusException(
                "Budget is not submitted for approval");
        }

        List<BudgetValidation> validations = validationService.validateBudget(concert);
        boolean isEligible = validations.stream()
            .noneMatch(v -> "ERROR".equals(v.severity()));

        return budgetMapper.toDetailResponse(concert, validations, isEligible);
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void approveBudget(Long concertId, ApproveBudgetRequest request, User approver) {
        log.info("Approving budget for concert: {}, approver: {}", concertId, approver.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetManagerAccess(concert, approver);
        accessValidator.validateBudgetForApproval(concert);

        if (!concert.getBudgetVersion().equals(request.budgetVersion())) {
            throw new BudgetVersionConflictException("Budget has been modified. Please refresh.");
        }

        if (request.itemApprovals() != null && !request.itemApprovals().isEmpty()) {
            budgetItemService.approveBudgetItems(concert, request.itemApprovals());
        }

        concert.setBudgetStatus(BudgetStatus.APPROVED);
        concert.setBudgetApprovedAt(LocalDateTime.now());
        concert.setBudgetApprovedById(approver.getId());

        BigDecimal approvedBudget = request.approvedBudget();
        concert.setBudget(approvedBudget);

        BudgetApproval approval = approvalRecordService.createApprovalRecord(
            concert,
            approver,
            ApprovalDecision.APPROVED,
            null
        );
        concert.getBudgetApprovals().add(approval);

        concertRepository.save(concert);
        notificationService.sendBudgetApprovedNotification(concert, approver);

        log.info("Budget approved for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void requestRevision(Long concertId, RequestBudgetRevisionRequest request, User requester) {
        log.info("Requesting budget revision for concert: {}", concertId);

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetManagerAccess(concert, requester);

        concert.setBudgetStatus(BudgetStatus.REVISION_REQUESTED);

        for (var revisionItem : request.requiredChanges()) {
            BudgetItem item = concert.getBudgetItems().stream()
                .filter(bi -> bi.getId().equals(revisionItem.itemId()))
                .findFirst()
                .orElse(null);
            
            if (item != null) {
                String revisionNote = revisionNoteBuilder.buildItemRevisionNote(revisionItem);
                revisionNoteBuilder.applyRevisionNoteToItem(item, revisionNote);
            }
        }

        String comments = revisionNoteBuilder.buildRevisionComments(request);
        BudgetApproval revisionRequest = approvalRecordService.createApprovalRecord(
            concert,
            requester,
            ApprovalDecision.RETURNED_FOR_REVISION,
            comments
        );
        revisionRequest.setRequiresRevision(true);
        concert.getBudgetApprovals().add(revisionRequest);

        String revisionNotes = revisionNoteBuilder.buildRevisionSummaryNotes(request);
        concert.setBudgetRejectionReason(revisionNotes);

        concertRepository.save(concert);
        notificationService.sendBudgetRevisionRequestedNotification(concert, requester, request);

        log.info("Budget revision requested for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN') or hasRole('ORGANIZER')")
    public void submitBudgetForApproval(Long concertId, SubmitBudgetForApprovalRequest request, User submitter) {
        log.info("Submitting budget for approval, concert: {}, submitter: {}", concertId, submitter.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetForSubmission(concert);

        concert.setSubmittedBudget(concert.getBudget() != null ? concert.getBudget() : BigDecimal.ZERO);
        concert.setBudgetStatus(BudgetStatus.SUBMITTED);
        concert.setBudgetVersion(concert.getBudgetVersion() + 1);

        concertRepository.save(concert);
        notificationService.sendBudgetSubmittedNotification(concert, submitter);

        log.info("Budget submitted for approval, concert: {}", concertId);
    }

    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public BudgetDetailResponse getBudgetDetailsForCoordinator(Long concertId, User coordinator) {
        log.debug("Fetching budget details for concert: {}, coordinator: {}", concertId, coordinator.getId());

        Concert concert = findConcertById(concertId);

        if (!concert.getCoordinator().getId().equals(coordinator.getId())) {
            throw new com.concertflow.api.exceptions.types.UnauthorizedAccessException(
                "You can only view budget details for your own concerts");
        }

        List<BudgetValidation> validations = validationService.validateBudget(concert);
        boolean isEligible = validations.stream()
            .noneMatch(v -> "ERROR".equals(v.severity()));

        return budgetMapper.toDetailResponse(concert, validations, isEligible);
    }

    private Concert findConcertById(Long concertId) {
        return concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));
    }

}

