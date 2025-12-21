package com.concertflow.api.dashboard.config;

public enum DashboardConstants {
    UPCOMING_DAYS(7),
    MONTHS_TO_DISPLAY(6),
    ATTENTION_NEEDED_DAYS(30),
    RECENT_CONCERTS_COUNT(3),
    UPCOMING_EVENTS_COUNT(3),
    URGENT_HOURS(24),
    UPCOMING_REMINDER_DAYS(3);

    private final int value;

    DashboardConstants(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

