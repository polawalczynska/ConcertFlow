package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.config.GenreColorGenerator;
import com.concertflow.api.dashboard.config.StatusColor;
import com.concertflow.api.dashboard.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {

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
            .upcomingConcertsCount(countUpcomingConcerts(allConcerts))
            .concertsNeedingAttention(countConcertsNeedingAttention(allConcerts))
            .genreStats(calculateGenreStats(allConcerts))
            .concertsByMonth(calculateConcertsByMonth(allConcerts))
            .statusDistribution(calculateStatusDistribution(statusCounts))
            .recentConcerts(calculateRecentConcerts(allConcerts))
            .alerts(calculateAlerts(allConcerts))
            .upcomingEvents(calculateUpcomingEvents(allConcerts))
            .genreChartData(calculateGenreChartData(allConcerts))
            .concertsByMonthChartData(calculateConcertsByMonthChartData(allConcerts))
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

    private long countUpcomingConcerts(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusDays(DashboardConstants.UPCOMING_DAYS.getValue());

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
        LocalDateTime oneMonthFromNow = now.plusDays(DashboardConstants.ATTENTION_NEEDED_DAYS.getValue());

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
        YearMonth startMonth = currentMonth.minusMonths(DashboardConstants.MONTHS_TO_DISPLAY.getValue() - 1);

        Map<YearMonth, Long> concertsByMonth = concerts.stream()
            .filter(concert -> concert.getDate() != null)
            .map(concert -> YearMonth.from(concert.getDate()))
            .filter(month -> isWithinRange(month, startMonth, currentMonth))
            .collect(Collectors.groupingBy(
                month -> month,
                Collectors.counting()
            ));

        return IntStream.range(0, DashboardConstants.MONTHS_TO_DISPLAY.getValue())
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

    private List<StatusDistribution> calculateStatusDistribution(Map<ConcertStatus, Long> statusCounts) {
        return Arrays.asList(
            StatusDistribution.builder()
                .status("Planning")
                .count(statusCounts.getOrDefault(ConcertStatus.PLANNING, 0L))
                .color(StatusColor.PLANNING.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Approved")
                .count(statusCounts.getOrDefault(ConcertStatus.APPROVED, 0L))
                .color(StatusColor.APPROVED.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Completed")
                .count(statusCounts.getOrDefault(ConcertStatus.COMPLETED, 0L))
                .color(StatusColor.COMPLETED.getHexColor())
                .build(),
            StatusDistribution.builder()
                .status("Cancelled")
                .count(statusCounts.getOrDefault(ConcertStatus.CANCELLED, 0L))
                .color(StatusColor.CANCELLED.getHexColor())
                .build()
        );
    }

    private List<RecentConcert> calculateRecentConcerts(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getCreatedAt() != null)
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(DashboardConstants.RECENT_CONCERTS_COUNT.getValue())
            .map(concert -> RecentConcert.builder()
                .name(concert.getName())
                .artist(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown Artist")
                .status(concert.getStatus().name())
                .build())
            .collect(Collectors.toList());
    }

    private List<CoordinatorAlert> calculateAlerts(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        List<CoordinatorAlert> alerts = new java.util.ArrayList<>();

        List<Concert> planningConcerts = concerts.stream()
            .filter(c -> c.getStatus() == ConcertStatus.PLANNING && c.getDate() != null)
            .toList();

        for (Concert concert : planningConcerts) {
            long hoursUntil = java.time.Duration.between(now, concert.getDate()).toHours();
            if (hoursUntil < DashboardConstants.URGENT_HOURS.getValue() && hoursUntil > 0) {
                alerts.add(CoordinatorAlert.builder()
                    .id(String.valueOf(concert.getId()))
                    .type(AlertType.ERROR)
                    .title("Urgent: Budget Approval Required")
                    .message(concert.getName() + " requires budget approval within 24 hours")
                    .concertId(String.valueOf(concert.getId()))
                    .actionRequired(ActionRequired.APPROVAL_NEEDED)
                    .createdAt(now)
                    .dismissed(false)
                    .build());
                break;
            }
        }

        List<Concert> upcomingConcerts = concerts.stream()
            .filter(c -> c.getDate() != null && c.getDate().isAfter(now))
            .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
            .limit(1)
            .toList();

        for (Concert concert : upcomingConcerts) {
            long daysUntil = java.time.Duration.between(now, concert.getDate()).toDays();
            if (daysUntil <= DashboardConstants.UPCOMING_REMINDER_DAYS.getValue()) {
                alerts.add(CoordinatorAlert.builder()
                    .id("upcoming-" + concert.getId())
                    .type(AlertType.INFO)
                    .title("Upcoming Concert Reminder")
                    .message(concert.getName() + " is scheduled in " + daysUntil + " days - final check needed")
                    .concertId(String.valueOf(concert.getId()))
                    .actionRequired(ActionRequired.UPCOMING_EVENT)
                    .createdAt(now)
                    .dismissed(false)
                    .build());
                break;
            }
        }

        return alerts;
    }

    private List<UpcomingEvent> calculateUpcomingEvents(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusDays(DashboardConstants.UPCOMING_DAYS.getValue() * 2L); // Get more concerts to filter

        return concerts.stream()
            .filter(concert -> concert.getDate() != null
                && concert.getDate().isAfter(now)
                && concert.getDate().isBefore(endDate)
                && concert.getStatus() != ConcertStatus.CANCELLED)
            .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
            .limit(DashboardConstants.UPCOMING_EVENTS_COUNT.getValue())
            .map(concert -> {
                long daysUntil = java.time.Duration.between(now, concert.getDate()).toDays();
                String status = daysUntil <= DashboardConstants.UPCOMING_DAYS.getValue() ? "Needs Attention" : "On Track";
                return UpcomingEvent.builder()
                    .id(concert.getId())
                    .name(concert.getName())
                    .date(concert.getDate())
                    .daysUntil(daysUntil)
                    .status(status)
                    .build();
            })
            .collect(Collectors.toList());
    }

    private List<GenreChartData> calculateGenreChartData(List<Concert> concerts) {
        List<GenreStats> genreStats = calculateGenreStats(concerts);
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

    private List<ConcertsByMonthChartData> calculateConcertsByMonthChartData(List<Concert> concerts) {
        List<ConcertsByMonth> concertsByMonth = calculateConcertsByMonth(concerts);

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

