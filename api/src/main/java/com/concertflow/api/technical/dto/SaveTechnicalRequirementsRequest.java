package com.concertflow.api.technical.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record SaveTechnicalRequirementsRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @Positive(message = "Power requirements must be positive")
    BigDecimal powerRequirements,

    String technicalRequirements,

    List<String> technicalFlags,

    AudioRequirementsDto audio,

    LightingRequirementsDto lighting,

    SafetyRequirementsDto safety
) {}

