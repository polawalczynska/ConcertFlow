package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.dto.GenreStats;
import com.concertflow.api.dashboard.dto.ConcertsByMonth;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {
    private static final int UPCOMING_DAYS = 7;
    private static final int MONTHS_TO_DISPLAY = 6;
    private static final int ATTENTION_NEEDED_DAYS = 30;

    private final ConcertRepository concertRepository;

    @Cacheable(value = "dashboardStats", key = "'coordinatorStats'")
    public CoordinatorStatsResponse getCoordinatorStats() {
        List<Concert> allConcerts = concertRepository.findAll();
        Map<ConcertStatus, Long> statusCounts = calculateStatusCounts(allConcerts);

        return CoordinatorStatsResponse.builder()
            .totalConcerts(allConcerts.size())
            .plannedConcerts(statusCounts.getOrDefault(ConcertStatus.PLANNING, 0L))
            .approvedConcerts(statusCounts.getOrDefault(ConcertStatus.APPROVED, 0L))
            .completedConcerts(statusCounts.getOrDefault(ConcertStatus.COMPLETED, 0L))
            .cancelledConcerts(statusCounts.getOrDefault(ConcertStatus.CANCELLED, 0L))
            .totalRevenue(calculateTotalRevenue(allConcerts))
            .upcomingConcertsCount(countUpcomingConcerts(allConcerts))
            .concertsNeedingAttention(countConcertsNeedingAttention(allConcerts))
            .genreStats(calculateGenreStats(allConcerts))
            .concertsByMonth(calculateConcertsByMonth(allConcerts))
            .lastUpdated(LocalDateTime.now())
            .build();
    }

    private Map<ConcertStatus, Long> calculateStatusCounts(List<Concert> concerts) {
        return concerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getStatus,
                Collectors.counting()
            ));
    }

    private long calculateTotalRevenue(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getStatus() == ConcertStatus.COMPLETED)
            .map(Concert::getBudget)
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .longValue();
    }

    private long countUpcomingConcerts(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusDays(UPCOMING_DAYS);

        return concerts.stream()
            .filter(concert -> isUpcomingConcert(concert, now, endDate))
            .count();
    }

    private boolean isUpcomingConcert(Concert concert, LocalDateTime now, LocalDateTime endDate) {
        return concert.getDate() != null
            && concert.getDate().isAfter(now)
            && concert.getDate().isBefore(endDate)
            && concert.getStatus() != ConcertStatus.CANCELLED;
    }

    private long countConcertsNeedingAttention(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMonthFromNow = now.plusDays(ATTENTION_NEEDED_DAYS);

        return concerts.stream()
            .filter(concert -> needsAttention(concert, now, oneMonthFromNow))
            .count();
    }

    private boolean needsAttention(Concert concert, LocalDateTime now, LocalDateTime oneMonthFromNow) {
        return concert.getStatus() == ConcertStatus.PLANNING
            && concert.getDate() != null
            && concert.getDate().isAfter(now)
            && concert.getDate().isBefore(oneMonthFromNow);
    }

    private List<GenreStats> calculateGenreStats(List<Concert> concerts) {
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

    private List<ConcertsByMonth> calculateConcertsByMonth(List<Concert> concerts) {
        YearMonth currentMonth = YearMonth.now();
        YearMonth startMonth = currentMonth.minusMonths(MONTHS_TO_DISPLAY - 1);

        Map<YearMonth, Long> concertsByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null)
            .map(concert -> YearMonth.from(concert.getDate()))
            .filter(month -> isWithinRange(month, startMonth, currentMonth))
            .collect(Collectors.groupingBy(
                month -> month,
                Collectors.counting()
            ));

        return IntStream.range(0, MONTHS_TO_DISPLAY)
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

