package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.ConcertsByMonth;
import org.springframework.stereotype.Component;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class ConcertsByMonthCalculator implements StatCalculator<List<ConcertsByMonth>> {
    @Override
    public List<ConcertsByMonth> calculate(List<Concert> concerts) {
        YearMonth currentMonth = YearMonth.now();
        YearMonth startMonth = currentMonth.minusMonths(DashboardConstants.MONTHS_TO_DISPLAY.getValue() - 1);

        Map<YearMonth, Long> concertsByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null)
            .map(concert -> YearMonth.from(concert.getDate()))
            .filter(month -> isWithinRange(month, startMonth, currentMonth))
            .collect(Collectors.groupingBy(
                month -> month,
                Collectors.counting()
            ));

        return IntStream.range(0, DashboardConstants.MONTHS_TO_DISPLAY.getValue())
            .mapToObj(i -> {
                YearMonth month = startMonth.plusMonths(i);
                long count = concertsByMonth.getOrDefault(month, 0L);
                return ConcertsByMonth.builder()
                    .month(month)
                    .concertCount(count)
                    .build();
            })
            .collect(Collectors.toList());
    }

    private boolean isWithinRange(YearMonth month, YearMonth start, YearMonth end) {
        return !month.isBefore(start) && !month.isAfter(end);
    }
}

