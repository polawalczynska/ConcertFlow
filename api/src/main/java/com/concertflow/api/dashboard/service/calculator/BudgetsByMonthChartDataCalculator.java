package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.dto.BudgetsByMonthChartData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class BudgetsByMonthChartDataCalculator implements StatCalculator<List<BudgetsByMonthChartData>> {
    @Override
    public List<BudgetsByMonthChartData> calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sixMonthsAgo = now.minusMonths(5).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);

        Map<String, BigDecimal> budgetsByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null && concert.getDate().isAfter(sixMonthsAgo))
            .filter(concert -> concert.getApprovedBudget() != null && concert.getApprovedBudget().compareTo(BigDecimal.ZERO) > 0)
            .collect(Collectors.groupingBy(
                concert -> concert.getDate().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH),
                Collectors.reducing(
                    BigDecimal.ZERO,
                    Concert::getApprovedBudget,
                    BigDecimal::add
                )
            ));

        List<String> monthOrder = List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        List<String> lastSixMonths = new ArrayList<>();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime month = now.minusMonths(i);
            lastSixMonths.add(month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
        }

        return lastSixMonths.stream()
            .map(month -> BudgetsByMonthChartData.builder()
                .month(month)
                .approvedAmount(budgetsByMonth.getOrDefault(month, BigDecimal.ZERO))
                .build())
            .collect(Collectors.toList());
    }
}

