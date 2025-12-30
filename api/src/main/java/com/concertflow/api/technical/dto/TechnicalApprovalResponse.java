package com.concertflow.api.technical.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TechnicalApprovalResponse(
    Long id,
    String approverName,
    String approverRole,
    String decision,
    String comments,
    LocalDateTime decisionDate,
    Integer approvalLevel,
    Boolean requiresRevision
) {}

