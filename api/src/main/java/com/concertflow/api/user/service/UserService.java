package com.concertflow.api.user.service;

import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserResponse getUserResponse(User user) {
        return UserResponse.fromUser(user);
    }
}

