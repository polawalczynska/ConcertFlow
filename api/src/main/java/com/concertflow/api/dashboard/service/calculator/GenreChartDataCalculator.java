package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.GenreColorGenerator;
import com.concertflow.api.dashboard.dto.GenreChartData;
import com.concertflow.api.dashboard.dto.GenreStats;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class GenreChartDataCalculator implements StatCalculator<List<GenreChartData>> {
    private final GenreStatsCalculator genreStatsCalculator;

    public GenreChartDataCalculator(GenreStatsCalculator genreStatsCalculator) {
        this.genreStatsCalculator = genreStatsCalculator;
    }

    @Override
    public List<GenreChartData> calculate(List<Concert> concerts) {
        List<GenreStats> genreStats = genreStatsCalculator.calculate(concerts);
        long total = genreStats.stream()
            .mapToLong(GenreStats::concertCount)
            .sum();

        if (total == 0) {
            return List.of();
        }

        return IntStream.range(0, genreStats.size())
            .mapToObj(i -> {
                GenreStats genre = genreStats.get(i);
                int percentage = (int) Math.round(((double) genre.concertCount() / total) * 100);
                String color = GenreColorGenerator.generateColor(i, genreStats.size());
                return GenreChartData.builder()
                    .name(genre.genre())
                    .value(percentage)
                    .color(color)
                    .build();
            })
            .collect(Collectors.toList());
    }
}

