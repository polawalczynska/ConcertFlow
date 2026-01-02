package com.concertflow.api.user.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSearchService {
    private final UserRepository userRepository;

    public UserResponse getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(UserResponse::fromUser)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }
}

