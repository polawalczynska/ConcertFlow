package com.concertflow.api.technical.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record SubmitTechnicalRequirementsRequest(
    @NotNull(message = "Concert ID is required")
    Long concertId,

    @Size(max = 2000, message = "Notes can have maximum 2000 characters")
    String notes,

    @NotNull(message = "You must accept terms")
    Boolean termsAccepted
) {}

