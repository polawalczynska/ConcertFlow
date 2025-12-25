package com.concertflow.api.concert.entity;

public enum ApprovalDecision {
    APPROVED("Approved"),
    REJECTED("Rejected"),
    RETURNED_FOR_REVISION("Returned for Revision"),
    PENDING("Pending");

    private final String displayName;

    ApprovalDecision(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

