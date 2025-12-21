package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.dto.ConcertsByMonth;
import com.concertflow.api.dashboard.dto.ConcertsByMonthChartData;
import org.springframework.stereotype.Component;

import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ConcertsByMonthChartDataCalculator implements StatCalculator<List<ConcertsByMonthChartData>> {
    private final ConcertsByMonthCalculator concertsByMonthCalculator;

    public ConcertsByMonthChartDataCalculator(ConcertsByMonthCalculator concertsByMonthCalculator) {
        this.concertsByMonthCalculator = concertsByMonthCalculator;
    }

    @Override
    public List<ConcertsByMonthChartData> calculate(List<Concert> concerts) {
        List<ConcertsByMonth> concertsByMonth = concertsByMonthCalculator.calculate(concerts);

        return concertsByMonth.stream()
            .map(item -> {
                String monthName = item.month().getMonth()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                return ConcertsByMonthChartData.builder()
                    .month(monthName)
                    .concertCount(item.concertCount())
                    .build();
            })
            .collect(Collectors.toList());
    }
}

