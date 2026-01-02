package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.BudgetCategoryColorGenerator;
import com.concertflow.api.dashboard.dto.BudgetCategoryChartData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class BudgetCategoryChartDataCalculator implements StatCalculator<List<BudgetCategoryChartData>> {
    @Override
    public List<BudgetCategoryChartData> calculate(List<Concert> concerts) {
        Map<String, BigDecimal> categoryAmounts = concerts.stream()
            .flatMap(concert -> concert.getBudgetItems().stream())
            .filter(item -> item.getApprovedAmount() != null && item.getApprovedAmount().compareTo(BigDecimal.ZERO) > 0)
            .collect(Collectors.groupingBy(
                BudgetItem::getCategory,
                Collectors.reducing(
                    BigDecimal.ZERO,
                    BudgetItem::getApprovedAmount,
                    BigDecimal::add
                )
            ));

        List<Map.Entry<String, BigDecimal>> sortedCategories = categoryAmounts.entrySet().stream()
            .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
            .collect(Collectors.toList());

        if (sortedCategories.isEmpty()) {
            return List.of();
        }

        return IntStream.range(0, sortedCategories.size())
            .mapToObj(i -> {
                Map.Entry<String, BigDecimal> entry = sortedCategories.get(i);
                String color = BudgetCategoryColorGenerator.generateColor(i, sortedCategories.size());
                return BudgetCategoryChartData.builder()
                    .category(entry.getKey())
                    .amount(entry.getValue())
                    .color(color)
                    .build();
            })
            .collect(Collectors.toList());
    }
}

