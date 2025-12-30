package com.concertflow.api.technical.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record TechnicalRevisionItem(
    @NotBlank(message = "Area ID is required")
    String areaId,

    @NotBlank(message = "Change reason is required")
    String changeReason,

    String notes
) {}

