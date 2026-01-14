package com.concertflow.api.concert.adapter;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalStatus;

public interface StatusFormatterInterface {
    String adapt(ConcertStatus status);
    String adapt(BudgetStatus status);
    String adapt(TechnicalStatus status);
}

