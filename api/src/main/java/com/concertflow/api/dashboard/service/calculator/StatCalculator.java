package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;

import java.util.List;

public interface StatCalculator<T> {
    T calculate(List<Concert> concerts);
}

