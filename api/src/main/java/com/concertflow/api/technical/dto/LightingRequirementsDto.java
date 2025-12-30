package com.concertflow.api.technical.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record LightingRequirementsDto(
    Integer totalFixtures,
    Integer dmxUniverses,
    BigDecimal lightingPowerDraw,
    List<LightingFixtureDto> fixtures
) {}

