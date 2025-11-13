package com.concertflow.api.concert.service.interfaces;

import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.user.entity.User;

import java.util.List;

public interface ConcertService {
    List<ConcertResponse> getAllConcerts(
        ConcertStatus status,
        Long artistId,
        Long coordinatorId,
        String search,
        int page,
        int pageSize
    );

    ConcertResponse getConcertById(Long id);

    void createConcert(ConcertRequest request, User coordinator);

    void updateConcert(Long id, ConcertRequest request, User coordinator);

    void deleteConcert(Long id, User coordinator);
}

