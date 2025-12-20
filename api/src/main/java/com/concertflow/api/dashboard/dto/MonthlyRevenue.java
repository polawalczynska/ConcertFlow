package com.concertflow.api.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.YearMonth;

@Builder
public record MonthlyRevenue(
    @JsonFormat(pattern = "yyyy-MM")
    YearMonth month,
    BigDecimal revenue
) {}

