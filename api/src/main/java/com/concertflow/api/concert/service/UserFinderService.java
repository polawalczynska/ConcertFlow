package com.concertflow.api.concert.service;

import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.service.UserFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserFinderService {
    private final UserFinder userFinder;

    public User findBudgetManagerById(Long id) {
        return userFinder.findByIdAndRoleOrThrow(id, Role.BUDGET_MANAGER, "Budget manager");
    }

    public User findTechnicalManagerById(Long id) {
        return userFinder.findByIdAndRoleOrThrow(id, Role.TECHNICAL_MANAGER, "Technical manager");
    }
}

