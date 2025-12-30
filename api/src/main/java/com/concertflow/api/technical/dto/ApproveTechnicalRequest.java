package com.concertflow.api.technical.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ApproveTechnicalRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @NotNull(message = "Technical version is required")
    Integer technicalVersion
) {}

