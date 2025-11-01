package com.concertflow.api.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TimeConstants {
    public static final long MILLIS_PER_SECOND = 1000L;
    public static final long SECONDS_PER_MINUTE = 60L;
    public static final long MINUTES_PER_HOUR = 60L;
    public static final long HOURS_PER_DAY = 24L;
    public static final long DAYS_PER_WEEK = 7L;

    public static final long MILLIS_PER_MINUTE = MILLIS_PER_SECOND * SECONDS_PER_MINUTE;
    public static final long MILLIS_PER_HOUR = MILLIS_PER_MINUTE * MINUTES_PER_HOUR;
    public static final long MILLIS_PER_DAY = MILLIS_PER_HOUR * HOURS_PER_DAY;
    public static final long MILLIS_PER_WEEK = MILLIS_PER_DAY * DAYS_PER_WEEK;
    public static final long ONE_WEEK = MILLIS_PER_WEEK;
    public static final long ONE_DAY = MILLIS_PER_DAY;
    public static final long THIRTY_DAYS = 30 * MILLIS_PER_DAY;
    public static final long ONE_HOUR = MILLIS_PER_HOUR;
    public static final long FIFTEEN_MINUTES = 15 * MILLIS_PER_MINUTE;
}

