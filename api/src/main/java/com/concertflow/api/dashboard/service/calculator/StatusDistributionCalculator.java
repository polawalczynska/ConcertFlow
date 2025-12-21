package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.StatusColor;
import com.concertflow.api.dashboard.dto.StatusDistribution;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class StatusDistributionCalculator implements StatCalculator<List<StatusDistribution>> {
    private final StatusCountCalculator statusCountCalculator;

    public StatusDistributionCalculator(StatusCountCalculator statusCountCalculator) {
        this.statusCountCalculator = statusCountCalculator;
    }

    @Override
    public List<StatusDistribution> calculate(List<Concert> concerts) {
        Map<ConcertStatus, Long> statusCounts = statusCountCalculator.calculate(concerts);

        return Arrays.asList(
            StatusDistribution.builder()
                .status("Planning")
                .count(statusCounts.getOrDefault(ConcertStatus.PLANNING, 0L))
                .color(StatusColor.PLANNING.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Approved")
                .count(statusCounts.getOrDefault(ConcertStatus.APPROVED, 0L))
                .color(StatusColor.APPROVED.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Completed")
                .count(statusCounts.getOrDefault(ConcertStatus.COMPLETED, 0L))
                .color(StatusColor.COMPLETED.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Cancelled")
                .count(statusCounts.getOrDefault(ConcertStatus.CANCELLED, 0L))
                .color(StatusColor.CANCELLED.getHexColor())
                .build()
        );
    }
}

