package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.dto.GenreStats;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {
    private final ConcertRepository concertRepository;

    public CoordinatorStatsResponse getCoordinatorStats() {
        List<Concert> allConcerts = concertRepository.findAll();

        long totalConcerts = allConcerts.size();
        long plannedConcerts = countByStatus(allConcerts, ConcertStatus.PLANNING);
        long approvedConcerts = countByStatus(allConcerts, ConcertStatus.APPROVED);
        long completedConcerts = countByStatus(allConcerts, ConcertStatus.COMPLETED);
        long cancelledConcerts = countByStatus(allConcerts, ConcertStatus.CANCELLED);

        BigDecimal totalRevenue = allConcerts.stream()
            .filter(c -> c.getStatus() == ConcertStatus.COMPLETED)
            .map(Concert::getBudget)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sevenDaysFromNow = now.plusDays(7);
        long upcomingConcertsCount = allConcerts.stream()
            .filter(c -> c.getDate() != null
                && c.getDate().isAfter(now)
                && c.getDate().isBefore(sevenDaysFromNow)
                && c.getStatus() != ConcertStatus.CANCELLED)
            .count();

        List<GenreStats> genreStats = calculateGenreStats(allConcerts);

        return CoordinatorStatsResponse.builder()
            .totalConcerts(totalConcerts)
            .plannedConcerts(plannedConcerts)
            .approvedConcerts(approvedConcerts)
            .completedConcerts(completedConcerts)
            .cancelledConcerts(cancelledConcerts)
            .totalRevenue(totalRevenue.longValue())
            .upcomingConcertsCount(upcomingConcertsCount)
            .genreStats(genreStats)
            .lastUpdated(LocalDateTime.now())
            .build();
    }

    private long countByStatus(List<Concert> concerts, ConcertStatus status) {
        return concerts.stream()
            .filter(c -> c.getStatus() == status)
            .count();
    }

    private List<GenreStats> calculateGenreStats(List<Concert> concerts) {
        Map<String, Long> genreCounts = concerts.stream()
            .filter(c -> c.getArtist() != null && c.getArtist().getGenre() != null && !c.getArtist().getGenre().isEmpty())
            .collect(Collectors.groupingBy(
                c -> c.getArtist().getGenre(),
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
}

