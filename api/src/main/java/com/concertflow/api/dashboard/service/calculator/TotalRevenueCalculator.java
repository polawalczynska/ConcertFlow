package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class TotalRevenueCalculator implements StatCalculator<Long> {
    @Override
    public Long calculate(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getStatus() == ConcertStatus.COMPLETED)
            .map(Concert::getBudget)
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .longValue();
    }
}

