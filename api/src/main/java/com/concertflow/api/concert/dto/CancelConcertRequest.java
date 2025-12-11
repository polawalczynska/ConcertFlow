package com.concertflow.api.concert.dto;

import jakarta.validation.constraints.NotBlank;

public record CancelConcertRequest(
    @NotBlank(message = "Cancellation reason is required") String cancellationReason
) {
}

