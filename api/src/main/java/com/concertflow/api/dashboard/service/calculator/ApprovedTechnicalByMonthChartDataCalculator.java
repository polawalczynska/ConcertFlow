package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.dashboard.dto.ApprovedTechnicalByMonthChartData;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ApprovedTechnicalByMonthChartDataCalculator implements StatCalculator<List<ApprovedTechnicalByMonthChartData>> {
    @Override
    public List<ApprovedTechnicalByMonthChartData> calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        YearMonth currentMonth = YearMonth.now();
        YearMonth endMonth = currentMonth.plusMonths(5);

        Map<YearMonth, Long> approvedByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null)
            .filter(concert -> {
                YearMonth concertMonth = YearMonth.from(concert.getDate());
                return !concertMonth.isBefore(currentMonth) && !concertMonth.isAfter(endMonth);
            })
            .filter(concert -> concert.getDate().isAfter(now))
            .filter(concert -> concert.getTechnicalStatus() == TechnicalStatus.APPROVED)
            .collect(Collectors.groupingBy(
                concert -> YearMonth.from(concert.getDate()),
                Collectors.counting()
            ));

        List<ApprovedTechnicalByMonthChartData> result = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            YearMonth month = currentMonth.plusMonths(i);
            String monthName = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            long count = approvedByMonth.getOrDefault(month, 0L);
            result.add(ApprovedTechnicalByMonthChartData.builder()
                .month(monthName)
                .approvedCount(count)
                .build());
        }

        return result;
    }
}

