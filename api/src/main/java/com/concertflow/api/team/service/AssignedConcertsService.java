package com.concertflow.api.team.service;

import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.mappers.ConcertMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AssignedConcertsService {
    private final ConcertRepository concertRepository;
    private final ConcertMapper concertMapper;

    public List<ConcertResponse> getAssignedConcerts(Long userId) {
        List<Concert> coordinatorConcerts = concertRepository.findByCoordinatorId(userId);
        List<Concert> budgetManagerConcerts = concertRepository.findByBudgetManagerId(userId);
        List<Concert> technicalManagerConcerts = concertRepository.findByTechnicalManagerId(userId);

        Set<Long> seenIds = new java.util.HashSet<>();
        List<Concert> allConcerts = new ArrayList<>();

        for (Concert concert : coordinatorConcerts) {
            if (seenIds.add(concert.getId())) {
                allConcerts.add(concert);
            }
        }

        for (Concert concert : budgetManagerConcerts) {
            if (seenIds.add(concert.getId())) {
                allConcerts.add(concert);
            }
        }

        for (Concert concert : technicalManagerConcerts) {
            if (seenIds.add(concert.getId())) {
                allConcerts.add(concert);
            }
        }

        return allConcerts.stream()
            .map(concertMapper::toResponse)
            .collect(Collectors.toList());
    }
}

