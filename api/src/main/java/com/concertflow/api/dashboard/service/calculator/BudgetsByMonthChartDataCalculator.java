package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.dto.BudgetsByMonthChartData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class BudgetsByMonthChartDataCalculator implements StatCalculator<List<BudgetsByMonthChartData>> {
    @Override
    public List<BudgetsByMonthChartData> calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        YearMonth currentMonth = YearMonth.now();
        YearMonth endMonth = currentMonth.plusMonths(5);

        Map<YearMonth, BigDecimal> budgetsByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null)
            .filter(concert -> {
                YearMonth concertMonth = YearMonth.from(concert.getDate());
                return !concertMonth.isBefore(currentMonth) && !concertMonth.isAfter(endMonth);
            })
            .filter(concert -> concert.getDate().isAfter(now))
            .filter(concert -> concert.getBudgetStatus() == BudgetStatus.APPROVED)
            .filter(concert -> {
                BigDecimal approvedAmount = concert.getApprovedBudget();
                if (approvedAmount == null || approvedAmount.compareTo(BigDecimal.ZERO) <= 0) {
                    approvedAmount = concert.getBudget();
                }
                return approvedAmount != null && approvedAmount.compareTo(BigDecimal.ZERO) > 0;
            })
            .collect(Collectors.groupingBy(
                concert -> YearMonth.from(concert.getDate()),
                Collectors.reducing(
                    BigDecimal.ZERO,
                    concert -> {
                        BigDecimal approvedAmount = concert.getApprovedBudget();
                        if (approvedAmount == null || approvedAmount.compareTo(BigDecimal.ZERO) <= 0) {
                            approvedAmount = concert.getBudget();
                        }
                        return approvedAmount != null ? approvedAmount : BigDecimal.ZERO;
                    },
                    BigDecimal::add
                )
            ));

        List<BudgetsByMonthChartData> result = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            YearMonth month = currentMonth.plusMonths(i);
            String monthName = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            BigDecimal amount = budgetsByMonth.getOrDefault(month, BigDecimal.ZERO);
            result.add(BudgetsByMonthChartData.builder()
                .month(monthName)
                .approvedAmount(amount)
                .build());
        }

        return result;
    }
}

