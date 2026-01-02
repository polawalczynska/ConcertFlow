package com.concertflow.api.user.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import com.concertflow.api.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse getUserResponse(User user) {
        if (user == null) {
            throw new org.springframework.security.authentication.AuthenticationCredentialsNotFoundException(
                "User not authenticated");
        }
        return UserResponse.fromUser(user);
    }

    public List<UserResponse> getBudgetManagers() {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == Role.BUDGET_MANAGER && user.getActive())
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    public List<UserResponse> getTechnicalManagers() {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == Role.TECHNICAL_MANAGER && user.getActive())
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    public UserResponse getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(UserResponse::fromUser)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }
}

