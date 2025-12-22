package com.concertflow.api.budget;

import com.concertflow.api.budget.dto.*;
import com.concertflow.api.budget.service.BudgetApprovalService;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget/approval")
@RequiredArgsConstructor
public class BudgetApprovalController {
    private final BudgetApprovalService budgetApprovalService;

    @GetMapping("/pending")
    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public Page<BudgetApprovalDashboardResponse> getPendingBudgets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(defaultValue = "date") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {

        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        return budgetApprovalService.getPendingBudgets(pageable);
    }

    @GetMapping("/concert/{concertId}")
    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public BudgetDetailResponse getBudgetDetails(@PathVariable Long concertId) {
        return budgetApprovalService.getBudgetDetails(concertId);
    }

    @PostMapping("/concert/{concertId}/approve")
    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void approveBudget(
        @PathVariable Long concertId,
        @Valid @RequestBody ApproveBudgetRequest request,
        @AuthenticationPrincipal User approver
    ) {
        budgetApprovalService.approveBudget(concertId, request, approver);
    }

    @PostMapping("/concert/{concertId}/reject")
    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void rejectBudget(
        @PathVariable Long concertId,
        @Valid @RequestBody RejectBudgetRequest request,
        @AuthenticationPrincipal User rejector
    ) {
        budgetApprovalService.rejectBudget(concertId, request, rejector);
    }

    @PostMapping("/concert/{concertId}/request-revision")
    @PreAuthorize("hasRole('BUDGET_MANAGER') or hasRole('ADMIN')")
    public void requestBudgetRevision(
        @PathVariable Long concertId,
        @Valid @RequestBody RequestBudgetRevisionRequest request,
        @AuthenticationPrincipal User requester
    ) {
        budgetApprovalService.requestRevision(concertId, request, requester);
    }

    @PostMapping("/concert/{concertId}/submit")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN') or hasRole('ORGANIZER')")
    public void submitBudgetForApproval(
        @PathVariable Long concertId,
        @Valid @RequestBody SubmitBudgetForApprovalRequest request,
        @AuthenticationPrincipal User submitter
    ) {
        budgetApprovalService.submitBudgetForApproval(concertId, request, submitter);
    }
}

