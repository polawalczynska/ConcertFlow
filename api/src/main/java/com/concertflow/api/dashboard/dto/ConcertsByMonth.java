package com.concertflow.api.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.YearMonth;

@Builder
public record ConcertsByMonth(
    @JsonFormat(pattern = "yyyy-MM")
    YearMonth month,
    long concertCount
) {}

