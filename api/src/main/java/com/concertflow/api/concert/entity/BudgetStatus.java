package com.concertflow.api.concert.entity;

public enum BudgetStatus {
    PENDING("Pending Approval", "Budget is awaiting verification"),
    SUBMITTED("Submitted", "Budget has been submitted for approval"),
    UNDER_REVIEW("Under Review", "Budget is currently being reviewed"),
    APPROVED("Approved", "Budget has been approved"),
    REJECTED("Rejected", "Budget has been rejected"),
    REVISION_REQUESTED("Revision Required", "Budget requires revisions"),
    ARCHIVED("Archived", "Budget has been archived");

    private final String displayName;
    private final String description;

    BudgetStatus(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}

