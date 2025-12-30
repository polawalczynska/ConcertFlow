package com.concertflow.api.concert.entity;

public enum TechnicalStatus {
    PENDING("Pending", "Technical requirements are pending"),
    SUBMITTED("Submitted", "Technical requirements have been submitted for approval"),
    APPROVED("Approved", "Technical requirements have been approved"),
    REVISION_REQUESTED("Revision Requested", "Technical requirements require revisions");

    private final String displayName;
    private final String description;

    TechnicalStatus(String displayName, String description) {
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

