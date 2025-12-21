package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class StatusCountCalculator implements StatCalculator<Map<ConcertStatus, Long>> {
    @Override
    public Map<ConcertStatus, Long> calculate(List<Concert> concerts) {
        return concerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getStatus,
                Collectors.counting()
            ));
    }
}

