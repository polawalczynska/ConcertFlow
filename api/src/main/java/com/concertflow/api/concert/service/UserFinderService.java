package com.concertflow.api.concert.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserFinderService {
    private final UserRepository userRepository;

    public User findBudgetManagerById(Long id) {
        return userRepository.findById(id)
            .filter(user -> user.getRole() == Role.BUDGET_MANAGER && user.getActive())
            .orElseThrow(() -> new UserNotFoundException("Budget manager not found or inactive with ID: " + id));
    }

    public User findTechnicalManagerById(Long id) {
        return userRepository.findById(id)
            .filter(user -> user.getRole() == Role.TECHNICAL_MANAGER && user.getActive())
            .orElseThrow(() -> new UserNotFoundException("Technical manager not found or inactive with ID: " + id));
    }
}

