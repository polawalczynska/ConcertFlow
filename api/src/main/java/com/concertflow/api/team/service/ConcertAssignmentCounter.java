package com.concertflow.api.team.service;

import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class ConcertAssignmentCounter {
    private final ConcertRepository concertRepository;

    public Integer countAssignedConcerts(User user) {
        Set<Long> concertIds = new java.util.HashSet<>();
        concertRepository.findByCoordinatorId(user.getId()).forEach(c -> concertIds.add(c.getId()));
        concertRepository.findByBudgetManagerId(user.getId()).forEach(c -> concertIds.add(c.getId()));
        concertRepository.findByTechnicalManagerId(user.getId()).forEach(c -> concertIds.add(c.getId()));
        
        return concertIds.size();
    }
}

