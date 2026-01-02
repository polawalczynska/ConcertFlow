package com.concertflow.api.user.service;

import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.UserRepository;
import com.concertflow.api.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserQueryService {
    private final UserRepository userRepository;

    public List<UserResponse> getUsersByRole(Role role) {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == role && user.getActive())
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    public List<UserResponse> getBudgetManagers() {
        return getUsersByRole(Role.BUDGET_MANAGER);
    }

    public List<UserResponse> getTechnicalManagers() {
        return getUsersByRole(Role.TECHNICAL_MANAGER);
    }
}

