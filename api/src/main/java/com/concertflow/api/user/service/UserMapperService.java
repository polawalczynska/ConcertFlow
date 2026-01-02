package com.concertflow.api.user.service;

import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapperService {
    public UserResponse toUserResponse(User user) {
        if (user == null) {
            throw new org.springframework.security.authentication.AuthenticationCredentialsNotFoundException(
                "User not authenticated");
        }
        return UserResponse.fromUser(user);
    }
}

