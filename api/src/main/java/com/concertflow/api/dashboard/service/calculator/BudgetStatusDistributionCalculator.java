package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.StatusColor;
import com.concertflow.api.dashboard.dto.BudgetStatusDistribution;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class BudgetStatusDistributionCalculator implements StatCalculator<List<BudgetStatusDistribution>> {
    @Override
    public List<BudgetStatusDistribution> calculate(List<Concert> concerts) {
        Map<BudgetStatus, Long> statusCounts = concerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getBudgetStatus,
                Collectors.counting()
            ));

        return Arrays.asList(
            BudgetStatusDistribution.builder()
                .status("Pending Review")
                .count(statusCounts.getOrDefault(BudgetStatus.SUBMITTED, 0L) + 
                       statusCounts.getOrDefault(BudgetStatus.UNDER_REVIEW, 0L))
                .color("#FCD34D")
                .build(),
            BudgetStatusDistribution.builder()
                .status("Approved")
                .count(statusCounts.getOrDefault(BudgetStatus.APPROVED, 0L))
                .color("#10B981")
                .build(),
            BudgetStatusDistribution.builder()
                .status("Revision Requested")
                .count(statusCounts.getOrDefault(BudgetStatus.REVISION_REQUESTED, 0L))
                .color("#EF4444")
                .build()
        );
    }
}

