package com.concertflow.api.notification.service;

import com.concertflow.api.budget.dto.RequestBudgetRevisionRequest;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.notification.entity.Notification;
import com.concertflow.api.notification.entity.NotificationRepository;
import com.concertflow.api.notification.entity.NotificationType;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public void sendBudgetApprovedNotification(Concert concert, User approver) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.BUDGET_APPROVED,
                "Budget approved",
                String.format("Your budget request for %s has been approved", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Budget approved notification sent for concert: {}", concert.getId());
    }

    public void sendBudgetRejectedNotification(Concert concert, User rejector, String reason) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.BUDGET_REVISION_REQUESTED,
                "Budget revision requested",
                String.format("%s budget needs revision. Please review the requested changes.", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Budget rejected notification sent for concert: {}", concert.getId());
    }

    public void sendBudgetRevisionRequestedNotification(Concert concert, User requester, RequestBudgetRevisionRequest request) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.BUDGET_REVISION_REQUESTED,
                "Budget revision requested",
                String.format("%s budget needs revision. Please review the requested changes.", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Budget revision requested notification sent for concert: {}", concert.getId());
    }

    public void sendBudgetSubmittedNotification(Concert concert, User submitter) {
        User budgetManager = concert.getBudgetManager();
        if (budgetManager != null) {
            createNotification(
                budgetManager,
                NotificationType.BUDGET_SUBMITTED,
                "Budget submitted for approval",
                String.format("Budget for %s has been submitted and is awaiting approval", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Budget submitted notification sent for concert: {}", concert.getId());
    }

    public void sendTechnicalApprovedNotification(Concert concert, User approver) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.TECHNICAL_APPROVED,
                "Technical requirements approved",
                String.format("Technical requirements for %s have been approved", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Technical approved notification sent for concert: {}", concert.getId());
    }

    public void sendTechnicalRevisionRequestedNotification(Concert concert, User requester) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.TECHNICAL_REVISION_REQUESTED,
                "Technical requirements revision requested",
                String.format("Technical requirements for %s need revision. Please review the requested changes.", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Technical revision requested notification sent for concert: {}", concert.getId());
    }

    public void sendTechnicalSubmittedNotification(Concert concert, User submitter) {
        User technicalManager = concert.getTechnicalManager();
        if (technicalManager != null) {
            createNotification(
                technicalManager,
                NotificationType.TECHNICAL_SUBMITTED,
                "Technical requirements submitted",
                String.format("Technical requirements for %s have been submitted for review", concert.getName()),
                concert.getId(),
                null
            );
        }
        log.info("Technical submitted notification sent for concert: {}", concert.getId());
    }

    public void sendConcertStatusChangedNotification(Concert concert, ConcertStatus oldStatus, ConcertStatus newStatus) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.CONCERT_STATUS_CHANGED,
                "Concert status changed",
                String.format("%s status updated from %s to %s", concert.getName(), formatStatus(oldStatus), formatStatus(newStatus)),
                concert.getId(),
                null
            );
        }
        log.info("Concert status changed notification sent for concert: {}", concert.getId());
    }

    public void sendTeamInvitationNotification(TeamInvitation invitation) {
        User invitedUser = invitation.getInvitedUser();
        User invitedBy = invitation.getInvitedBy();
        if (invitedUser != null) {
            createNotification(
                invitedUser,
                NotificationType.TEAM_INVITATION,
                "Team invitation received",
                String.format("You have been invited to join the team by %s", 
                    invitedBy.getFirstName() + " " + invitedBy.getLastName()),
                null,
                invitation.getId()
            );
        }
        log.info("Team invitation notification sent for invitation: {}", invitation.getId());
    }

    public void sendUpcomingConcertReminder(Concert concert) {
        User coordinator = concert.getCoordinator();
        if (coordinator != null) {
            createNotification(
                coordinator,
                NotificationType.UPCOMING_CONCERT_REMINDER,
                "Upcoming concert reminder",
                String.format("%s is scheduled for %s", 
                    concert.getName(),
                    concert.getDate().toLocalDate().toString()),
                concert.getId(),
                null
            );
        }
        log.info("Upcoming concert reminder sent for concert: {}", concert.getId());
    }

    private Notification createNotification(
            User user,
            NotificationType type,
            String title,
            String description,
            Long concertId,
            Long invitationId) {
        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .description(description)
                .read(false)
                .concertId(concertId)
                .invitationId(invitationId)
                .build();
        
        return notificationRepository.save(notification);
    }

    private String formatStatus(ConcertStatus status) {
        return status.name().charAt(0) + status.name().substring(1).toLowerCase().replace("_", " ");
    }
}
