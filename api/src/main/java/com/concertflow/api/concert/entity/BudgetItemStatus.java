package com.concertflow.api.concert.entity;

public enum BudgetItemStatus {
    PLANNED("Planned"),
    APPROVED("Approved"),
    PAID("Paid"),
    CANCELLED("Cancelled"),
    PENDING_APPROVAL("Pending Approval");

    private final String displayName;

    BudgetItemStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

