package com.concertflow.api.approval.dto;

import com.concertflow.api.approval.entity.ApprovalStatus;
import jakarta.validation.constraints.NotNull;

public record ApprovalRequest(
    @NotNull ApprovalStatus decision,
    String comments
) {
}
