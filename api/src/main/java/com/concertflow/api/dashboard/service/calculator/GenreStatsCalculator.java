package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.dto.GenreStats;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class GenreStatsCalculator implements StatCalculator<List<GenreStats>> {
    @Override
    public List<GenreStats> calculate(List<Concert> concerts) {
        Map<String, Long> genreCounts = concerts.stream()
            .filter(this::hasValidGenre)
            .collect(Collectors.groupingBy(
                concert -> concert.getArtist().getGenre(),
                Collectors.counting()
            ));

        return genreCounts.entrySet().stream()
            .map(entry -> GenreStats.builder()
                .genre(entry.getKey())
                .concertCount(entry.getValue())
                .build())
            .sorted((a, b) -> Long.compare(b.concertCount(), a.concertCount()))
            .collect(Collectors.toList());
    }

    private boolean hasValidGenre(Concert concert) {
        return concert.getArtist() != null
            && concert.getArtist().getGenre() != null
            && !concert.getArtist().getGenre().isEmpty();
    }
}

