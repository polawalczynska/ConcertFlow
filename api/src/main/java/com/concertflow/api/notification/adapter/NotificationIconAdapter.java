package com.concertflow.api.notification.adapter;

import com.concertflow.api.notification.entity.NotificationType;
import org.springframework.stereotype.Component;

@Component
public class NotificationIconAdapter implements NotificationAdapterInterface {
    public String adapt(NotificationType type) {
        return switch (type) {
            case TEAM_INVITATION -> "Users";
            case BUDGET_REVISION_REQUESTED, BUDGET_SUBMITTED -> "DollarSign";
            case BUDGET_APPROVED -> "CheckCircle2";
            case TECHNICAL_REVISION_REQUESTED, TECHNICAL_SUBMITTED -> "Wrench";
            case TECHNICAL_APPROVED -> "CheckCircle2";
            case UPCOMING_CONCERT_REMINDER -> "Calendar";
            case CONCERT_STATUS_CHANGED -> "AlertCircle";
        };
    }
}

