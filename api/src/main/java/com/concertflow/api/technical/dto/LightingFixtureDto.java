package com.concertflow.api.technical.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record LightingFixtureDto(
    String type,
    Integer quantity,
    String universe,
    BigDecimal powerDraw
) {}

