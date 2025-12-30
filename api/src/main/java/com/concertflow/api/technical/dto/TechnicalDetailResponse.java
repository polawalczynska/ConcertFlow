package com.concertflow.api.technical.dto;

import com.concertflow.api.concert.entity.TechnicalStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record TechnicalDetailResponse(
    Long concertId,
    String concertName,
    String artistName,
    LocalDateTime concertDate,
    String venue,
    String city,
    TechnicalStatus technicalStatus,
    BigDecimal powerRequirements,
    String technicalRequirements,
    List<String> technicalFlags,
    AudioRequirementsDto audio,
    LightingRequirementsDto lighting,
    SafetyRequirementsDto safety,
    LocalDateTime submittedAt,
    LocalDateTime approvedAt,
    Long approvedById,
    Integer version
) {}

