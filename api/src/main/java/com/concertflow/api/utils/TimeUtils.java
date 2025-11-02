package com.concertflow.api.utils;

import lombok.experimental.UtilityClass;

import static com.concertflow.api.utils.TimeConstants.*;

@UtilityClass
public class TimeUtils {

    public static long millisecondsToMinutes(long milliseconds) {
        return milliseconds / MILLIS_PER_MINUTE;
    }

    public static long millisecondsToHours(long milliseconds) {
        return milliseconds / MILLIS_PER_HOUR;
    }

    public static long millisecondsToDays(long milliseconds) {
        return milliseconds / MILLIS_PER_DAY;
    }

    public static String formatDuration(long milliseconds) {
        if (milliseconds < MILLIS_PER_MINUTE) {
            return (milliseconds / MILLIS_PER_SECOND) + " seconds";
        } else if (milliseconds < MILLIS_PER_HOUR) {
            return (milliseconds / MILLIS_PER_MINUTE) + " minutes";
        } else if (milliseconds < MILLIS_PER_DAY) {
            return (milliseconds / MILLIS_PER_HOUR) + " hours";
        } else {
            return (milliseconds / MILLIS_PER_DAY) + " days";
        }
    }

    public static String formatDurationDetailed(long milliseconds) {
        if (milliseconds < MILLIS_PER_MINUTE) {
            return (milliseconds / MILLIS_PER_SECOND) + " seconds";
        } else if (milliseconds < MILLIS_PER_HOUR) {
            long minutes = milliseconds / MILLIS_PER_MINUTE;
            long seconds = (milliseconds % MILLIS_PER_MINUTE) / MILLIS_PER_SECOND;
            return minutes + " min " + seconds + " sec";
        } else if (milliseconds < MILLIS_PER_DAY) {
            long hours = milliseconds / MILLIS_PER_HOUR;
            long minutes = (milliseconds % MILLIS_PER_HOUR) / MILLIS_PER_MINUTE;
            return hours + " h " + minutes + " min";
        } else {
            long days = milliseconds / MILLIS_PER_DAY;
            long hours = (milliseconds % MILLIS_PER_DAY) / MILLIS_PER_HOUR;
            return days + " days " + hours + " h";
        }
    }
}

