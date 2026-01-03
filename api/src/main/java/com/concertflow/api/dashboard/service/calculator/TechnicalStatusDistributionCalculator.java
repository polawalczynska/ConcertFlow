package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.dashboard.dto.TechnicalStatusDistribution;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TechnicalStatusDistributionCalculator implements StatCalculator<List<TechnicalStatusDistribution>> {
    @Override
    public List<TechnicalStatusDistribution> calculate(List<Concert> concerts) {
        Map<TechnicalStatus, Long> statusCounts = concerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getTechnicalStatus,
                Collectors.counting()
            ));

        return Arrays.asList(
            TechnicalStatusDistribution.builder()
                .status("Pending Review")
                .count(statusCounts.getOrDefault(TechnicalStatus.PENDING, 0L) + 
                       statusCounts.getOrDefault(TechnicalStatus.SUBMITTED, 0L))
                .color("#FCD34D")
                .build(),
            TechnicalStatusDistribution.builder()
                .status("Approved")
                .count(statusCounts.getOrDefault(TechnicalStatus.APPROVED, 0L))
                .color("#10B981")
                .build(),
            TechnicalStatusDistribution.builder()
                .status("Revision Requested")
                .count(statusCounts.getOrDefault(TechnicalStatus.REVISION_REQUESTED, 0L))
                .color("#EF4444")
                .build()
        );
    }
}

