package com.concertflow.api.notification.service;

import com.concertflow.api.budget.dto.RequestBudgetRevisionRequest;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationService {
    public void sendBudgetApprovedNotification(Concert concert, User approver) {
        log.info("Sending budget approved notification for concert: {}, approver: {}", 
            concert.getId(), approver.getEmail());
    }

    public void sendBudgetRejectedNotification(Concert concert, User rejector, String reason) {
        log.info("Sending budget rejected notification for concert: {}, rejector: {}, reason: {}", 
            concert.getId(), rejector.getEmail(), reason);
    }

    public void sendBudgetRevisionRequestedNotification(Concert concert, User requester, RequestBudgetRevisionRequest request) {
        log.info("Sending budget revision requested notification for concert: {}, requester: {}", 
            concert.getId(), requester.getEmail());
    }

    public void sendBudgetSubmittedNotification(Concert concert, User submitter) {
        log.info("Sending budget submitted notification for concert: {}, submitter: {}", 
            concert.getId(), submitter.getEmail());
    }
}

