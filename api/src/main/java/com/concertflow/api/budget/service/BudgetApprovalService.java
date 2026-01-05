package com.concertflow.api.budget.service;

import com.concertflow.api.approval.chain.ApprovalChainService;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.budget.dto.*;
import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.mappers.BudgetMapper;
import com.concertflow.api.security.annotation.RequireBudgetManager;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BudgetApprovalService {
    private final ConcertRepository concertRepository;
    private final BudgetValidationService validationService;
    private final BudgetMapper budgetMapper;
    private final BudgetFlagService flagService;
    private final BudgetAccessValidator accessValidator;
    private final ApprovalChainService approvalChainService;

    @RequireBudgetManager
    public Page<BudgetApprovalDashboardResponse> getPendingBudgets(Pageable pageable, Long budgetManagerId, User authenticatedUser) {
        log.debug("Fetching budgets for budget manager ID: {}", budgetManagerId);

        accessValidator.validateBudgetManagerIdMatchesUser(budgetManagerId, authenticatedUser);

        Page<Concert> concerts = concertRepository.findByBudgetManagerId(
            budgetManagerId,
            pageable
        );

        return concerts.map(concert -> {
            List<String> flags = flagService.determineFlags(concert);
            return budgetMapper.toDashboardResponse(concert, flags);
        });
    }

    @RequireBudgetManager
    public BudgetDetailResponse getBudgetDetails(Long concertId, Long budgetManagerId, User authenticatedUser) {
        log.debug("Fetching budget details for concert: {}, budget manager ID: {}", concertId, budgetManagerId);

        accessValidator.validateBudgetManagerIdMatchesUser(budgetManagerId, authenticatedUser);

        Concert concert = findConcertById(concertId);

        List<BudgetValidation> validations = validationService.validateBudget(concert);
        boolean isEligible = validations.stream()
            .noneMatch(v -> "ERROR".equals(v.severity()));

        return budgetMapper.toDetailResponse(concert, validations, isEligible);
    }

    @RequireBudgetManager
    public void approveBudget(Long concertId, ApproveBudgetRequest request, User approver) {
        log.info("Approving budget for concert: {}, approver: {}", concertId, approver.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetManagerAccess(concert, approver);
        accessValidator.validateBudgetForApproval(concert);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(approver)
            .action(ApprovalRequest.ApprovalAction.APPROVE_BUDGET)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

        log.info("Budget approved for concert: {}", concertId);
    }

    @RequireBudgetManager
    public void requestRevision(Long concertId, RequestBudgetRevisionRequest request, User requester) {
        log.info("Requesting budget revision for concert: {}", concertId);

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetManagerAccess(concert, requester);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(requester)
            .action(ApprovalRequest.ApprovalAction.REQUEST_BUDGET_REVISION)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

        log.info("Budget revision requested for concert: {}", concertId);
    }

    @RequireCoordinator
    public void submitBudgetForApproval(Long concertId, SubmitBudgetForApprovalRequest request, User submitter) {
        log.info("Submitting budget for approval, concert: {}, submitter: {}", concertId, submitter.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateBudgetForSubmission(concert);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(submitter)
            .action(ApprovalRequest.ApprovalAction.SUBMIT_BUDGET)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

        log.info("Budget submitted for approval, concert: {}", concertId);
    }

    @RequireCoordinator
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

