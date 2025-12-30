package com.concertflow.api.technical.dto;

import com.concertflow.api.concert.entity.TechnicalStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record TechnicalApprovalDashboardResponse(
    Long concertId,
    String concertName,
    String artistName,
    LocalDateTime concertDate,
    String venue,
    String city,
    TechnicalStatus technicalStatus,
    BigDecimal powerRequirements,
    List<String> technicalFlags,
    Integer daysUntil,
    LocalDateTime submittedAt
) {}

