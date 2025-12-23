package com.concertflow.api.concert.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ConcertRequest(
    @NotBlank String name,
    @NotNull @Future LocalDateTime date,
    @NotBlank String venue,
    @NotNull @Positive BigDecimal budget,
    String description,
    @NotNull Long artistId,
    Long budgetManagerId
) {
}
