package com.concertflow.api.dashboard.config;

import lombok.experimental.UtilityClass;

@UtilityClass
public class AlertConstants {
    
    public static final String ALERT_TITLE_URGENT_BUDGET_APPROVAL = "Urgent: Budget Approval Required";
    public static final String ALERT_TITLE_UPCOMING_CONCERT_REMINDER = "Upcoming Concert Reminder";
    
    public static final String ALERT_MESSAGE_BUDGET_APPROVAL_TEMPLATE = "%s requires budget approval within 24 hours";
    public static final String ALERT_MESSAGE_UPCOMING_CONCERT_TEMPLATE = "%s is scheduled in %d days - final check needed";
}

