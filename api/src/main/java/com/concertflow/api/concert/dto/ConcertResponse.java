package com.concertflow.api.concert.dto;

import com.concertflow.api.approval.dto.ApprovalResponse;
import com.concertflow.api.concert.entity.ConcertStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ConcertResponse(
    Long id,
    String name,
    LocalDateTime date,
    String venue,
    ConcertStatus status,
    BigDecimal budget,
    String description,
    String cancellationReason,
    Long coordinatorId,
    String coordinatorName,
    Long artistId,
    String artistName,
    Long budgetManagerId,
    String budgetManagerName,
    List<ApprovalResponse> approvals,
    LocalDateTime createdAt
) {
}
