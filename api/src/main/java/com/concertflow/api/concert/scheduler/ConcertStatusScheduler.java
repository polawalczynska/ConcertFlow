package com.concertflow.api.concert.scheduler;

import com.concertflow.api.concert.service.ConcertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ConcertStatusScheduler {
    private final ConcertService concertService;

    @Scheduled(cron = "0 0 * * * ?")
    public void completePastConcerts() {
        try {
            log.info("Running scheduled task to complete past concerts");
            concertService.completePastConcerts();
            log.info("Completed past concerts task finished");
        } catch (Exception e) {
            log.error("Error completing past concerts", e);
        }
    }

    @Scheduled(cron = "0 0 * * * ?")
    public void cancelUnapprovedPastConcerts() {
        try {
            log.info("Running scheduled task to cancel unapproved past concerts");
            concertService.cancelUnapprovedPastConcerts();
            log.info("Cancel unapproved past concerts task finished");
        } catch (Exception e) {
            log.error("Error cancelling unapproved past concerts", e);
        }
    }
}



