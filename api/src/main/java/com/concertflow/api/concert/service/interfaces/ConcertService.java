package com.concertflow.api.concert.service.interfaces;

import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.user.entity.User;

public interface ConcertService {
    void createConcert(ConcertRequest request, User coordinator);
}

