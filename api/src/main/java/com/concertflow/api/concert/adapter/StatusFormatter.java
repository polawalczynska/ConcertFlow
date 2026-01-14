package com.concertflow.api.concert.adapter;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalStatus;
import org.springframework.stereotype.Component;

@Component
public class StatusFormatter {
    public String adapt(ConcertStatus status) {
        if (status == null) {
            return "Unknown";
        }

        return switch (status) {
            case PLANNING -> "Planning";
            case APPROVED -> "Approved";
            case CANCELLED -> "Cancelled";
            case COMPLETED -> "Completed";
        };
    }

    public String adapt(BudgetStatus status) {
        if (status == null) {
            return "Unknown";
        }

        return switch (status) {
            case PENDING -> "Pending";
            case SUBMITTED -> "Submitted";
            case UNDER_REVIEW -> "Under Review";
            case APPROVED -> "Approved";
            case REJECTED -> "Rejected";
            case REVISION_REQUESTED -> "Revision Requested";
            case ARCHIVED -> "Archived";
        };
    }

    public String adapt(TechnicalStatus status) {
        if (status == null) {
            return "Unknown";
        }

        return switch (status) {
            case PENDING -> "Pending";
            case SUBMITTED -> "Submitted";
            case APPROVED -> "Approved";
            case REVISION_REQUESTED -> "Revision Requested";
        };
    }
}

