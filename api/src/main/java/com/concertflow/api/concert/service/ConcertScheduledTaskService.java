package com.concertflow.api.concert.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.state.ConcertStateManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ConcertScheduledTaskService {
    private final ConcertRepository concertRepository;
    private final ConcertStateManager concertStateManager;

    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void completePastConcerts() {
        LocalDateTime now = LocalDateTime.now();
        List<Concert> concertsToComplete = concertRepository.findConcertsToComplete(now);
        
        if (!concertsToComplete.isEmpty()) {
            for (Concert concert : concertsToComplete) {
                try {
                    concertStateManager.complete(concert);
                } catch (Exception e) {
                    log.warn("Failed to complete concert {}: {}", concert.getId(), e.getMessage());
                }
            }
            log.info("Completed {} past concerts", concertsToComplete.size());
        }
    }

    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void cancelUnapprovedPastConcerts() {
        LocalDateTime now = LocalDateTime.now();
        List<Concert> concertsToCancel = concertRepository.findUnapprovedPastConcerts(now);
        
        if (!concertsToCancel.isEmpty()) {
            String cancellationReason = "Automatically cancelled - concert was not approved before the scheduled date";
            for (Concert concert : concertsToCancel) {
                try {
                    concertStateManager.cancel(concert, cancellationReason);
                } catch (Exception e) {
                    log.warn("Failed to cancel concert {}: {}", concert.getId(), e.getMessage());
                }
            }
            log.info("Cancelled {} unapproved past concerts", concertsToCancel.size());
        }
    }
}

