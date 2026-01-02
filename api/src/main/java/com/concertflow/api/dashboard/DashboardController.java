package com.concertflow.api.dashboard;

import com.concertflow.api.dashboard.dto.BudgetManagerStatsResponse;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.service.DashboardService;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/coordinator/stats")
    @PreAuthorize("hasRole('COORDINATOR')")
    public CoordinatorStatsResponse getCoordinatorStats(@AuthenticationPrincipal User coordinator) {
        return dashboardService.getCoordinatorStats(coordinator);
    }

    @GetMapping("/budget-manager/stats")
    @PreAuthorize("hasRole('BUDGET_MANAGER')")
    public BudgetManagerStatsResponse getBudgetManagerStats(@AuthenticationPrincipal User budgetManager) {
        return dashboardService.getBudgetManagerStats(budgetManager);
    }
}

