package com.concertflow.api.approval.dto;

import com.concertflow.api.approval.entity.ApprovalStatus;
import com.concertflow.api.approval.entity.ApprovalType;

import java.time.LocalDateTime;

public record ApprovalResponse(
    Long id,
    ApprovalType type,
    ApprovalStatus status,
    String comments,
    LocalDateTime decisionDate,
    LocalDateTime createdAt,
    Long concertId,
    String concertName,
    Long approverId,
    String approverName
) {
}
