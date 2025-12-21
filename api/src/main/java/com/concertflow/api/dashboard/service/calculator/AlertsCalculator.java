package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.ActionRequired;
import com.concertflow.api.dashboard.dto.AlertType;
import com.concertflow.api.dashboard.dto.CoordinatorAlert;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlertsCalculator implements StatCalculator<List<CoordinatorAlert>> {
    @Override
    public List<CoordinatorAlert> calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        List<CoordinatorAlert> alerts = new ArrayList<>();

        List<Concert> planningConcerts = concerts.stream()
            .filter(c -> c.getStatus() == ConcertStatus.PLANNING && c.getDate() != null)
            .collect(Collectors.toList());

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
            .collect(Collectors.toList());

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
}

