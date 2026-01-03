package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.dashboard.config.TechnicalAreaColorGenerator;
import com.concertflow.api.dashboard.dto.TechnicalAreaChartData;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TechnicalAreaChartDataCalculator implements StatCalculator<List<TechnicalAreaChartData>> {
    @Override
    public List<TechnicalAreaChartData> calculate(List<Concert> concerts) {
        Map<String, Long> areaCounts = concerts.stream()
            .filter(concert -> concert.getTechnicalRequirements() != null)
            .flatMap(concert -> {
                TechnicalRequirements requirements = concert.getTechnicalRequirements();
                List<String> areas = new ArrayList<>();

                if (hasAudioRequirements(requirements)) {
                    areas.add("Sound System");
                }
                if (hasLightingRequirements(requirements)) {
                    areas.add("Lighting");
                }
                if (hasSafetyRequirements(requirements)) {
                    areas.add("Safety Requirements");
                }
                if (hasPowerRequirements(requirements)) {
                    areas.add("Power Requirements");
                }
                
                return areas.stream();
            })
            .collect(Collectors.groupingBy(
                area -> area,
                Collectors.counting()
            ));

        if (areaCounts.isEmpty()) {
            return new ArrayList<>();
        }

        List<TechnicalAreaChartData> result = new ArrayList<>();
        List<Map.Entry<String, Long>> sortedAreas = areaCounts.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(5)
            .collect(Collectors.toList());

        for (int i = 0; i < sortedAreas.size(); i++) {
            Map.Entry<String, Long> entry = sortedAreas.get(i);
            String color = TechnicalAreaColorGenerator.generateColor(i, sortedAreas.size());
            result.add(TechnicalAreaChartData.builder()
                .area(entry.getKey())
                .count(entry.getValue())
                .color(color)
                .build());
        }

        return result;
    }

    private boolean hasAudioRequirements(TechnicalRequirements requirements) {
        return requirements.getAudioRequirements() != null 
            && !requirements.getAudioRequirements().trim().isEmpty();
    }

    private boolean hasLightingRequirements(TechnicalRequirements requirements) {
        return requirements.getLightingRequirements() != null 
            && !requirements.getLightingRequirements().trim().isEmpty();
    }

    private boolean hasSafetyRequirements(TechnicalRequirements requirements) {
        return requirements.getSafetyRequirements() != null 
            && !requirements.getSafetyRequirements().trim().isEmpty();
    }

    private boolean hasPowerRequirements(TechnicalRequirements requirements) {
        return requirements.getPowerRequirements() != null 
            && requirements.getPowerRequirements().compareTo(java.math.BigDecimal.ZERO) > 0;
    }
}

