package com.concertflow.api.budget;

import com.concertflow.api.budget.dto.*;
import com.concertflow.api.budget.service.BudgetApprovalService;
import com.concertflow.api.security.annotation.RequireBudgetManager;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget/approval")
@RequiredArgsConstructor
public class BudgetApprovalController {
    private final BudgetApprovalService budgetApprovalService;

    @GetMapping("/pending")
    @RequireBudgetManager
    public Page<BudgetApprovalDashboardResponse> getPendingBudgets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(defaultValue = "date") String sortBy,
        @RequestParam(defaultValue = "asc") String direction,
        @RequestParam Long budgetManagerId,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return budgetApprovalService.getPendingBudgets(pageable, budgetManagerId, authenticatedUser);
    }

    @GetMapping("/concert/{concertId}")
    @RequireBudgetManager
    public BudgetDetailResponse getBudgetDetails(
        @PathVariable Long concertId,
        @RequestParam Long budgetManagerId,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        return budgetApprovalService.getBudgetDetails(concertId, budgetManagerId, authenticatedUser);
    }

    @PostMapping("/concert/{concertId}/approve")
    @RequireBudgetManager
    public void approveBudget(
        @PathVariable Long concertId,
        @Valid @RequestBody ApproveBudgetRequest request,
        @AuthenticationPrincipal User approver
    ) {
        budgetApprovalService.approveBudget(concertId, request, approver);
    }

    @PostMapping("/concert/{concertId}/reject")
    @RequireBudgetManager
    public void rejectBudget(
        @PathVariable Long concertId,
        @Valid @RequestBody RejectBudgetRequest request,
        @AuthenticationPrincipal User rejector
    ) {
        budgetApprovalService.rejectBudget(concertId, request, rejector);
    }

    @PostMapping("/concert/{concertId}/request-revision")
    @RequireBudgetManager
    public void requestBudgetRevision(
        @PathVariable Long concertId,
        @Valid @RequestBody RequestBudgetRevisionRequest request,
        @AuthenticationPrincipal User requester
    ) {
        budgetApprovalService.requestRevision(concertId, request, requester);
    }

    @PostMapping("/concert/{concertId}/submit")
    @RequireCoordinator
    public void submitBudgetForApproval(
        @PathVariable Long concertId,
        @Valid @RequestBody SubmitBudgetForApprovalRequest request,
        @AuthenticationPrincipal User submitter
    ) {
        budgetApprovalService.submitBudgetForApproval(concertId, request, submitter);
    }
}

