package com.concertflow.api.dashboard;

import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.dashboard.dto.BudgetManagerStatsResponse;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.dto.TechnicalManagerStatsResponse;
import com.concertflow.api.dashboard.service.DashboardService;
import com.concertflow.api.security.annotation.RequireBudgetManager;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.security.annotation.RequireTechnicalManager;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstants.API_V1_BASE_PATH + "/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/coordinator/stats")
    @RequireCoordinator
    public CoordinatorStatsResponse getCoordinatorStats(@AuthenticationPrincipal User coordinator) {
        return dashboardService.getCoordinatorStats(coordinator);
    }

    @GetMapping("/budget-manager/stats")
    @RequireBudgetManager
    public BudgetManagerStatsResponse getBudgetManagerStats(@AuthenticationPrincipal User budgetManager) {
        return dashboardService.getBudgetManagerStats(budgetManager);
    }

    @GetMapping("/technical-manager/stats")
    @RequireTechnicalManager
    public TechnicalManagerStatsResponse getTechnicalManagerStats(@AuthenticationPrincipal User technicalManager) {
        return dashboardService.getTechnicalManagerStats(technicalManager);
    }
}

