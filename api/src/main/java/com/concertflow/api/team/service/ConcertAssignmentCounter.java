package com.concertflow.api.team.service;

import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConcertAssignmentCounter {
    private final ConcertRepository concertRepository;

    public Integer countAssignedConcerts(User user) {
        long budgetManagerCount = concertRepository.findByBudgetManagerId(user.getId()).size();
        long technicalManagerCount = concertRepository.findByTechnicalManagerId(user.getId()).size();
        return (int) (budgetManagerCount + technicalManagerCount);
    }
}

