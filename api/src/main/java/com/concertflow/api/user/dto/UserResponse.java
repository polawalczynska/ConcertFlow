package com.concertflow.api.user.dto;

import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;

import java.time.LocalDateTime;

public record UserResponse(
    Long id,
    String email,
    String firstName,
    String lastName,
    Role role,
    Boolean active,
    LocalDateTime createdAt
) {
    public static UserResponse fromUser(User user) {
        return new UserResponse(
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole(),
            user.getActive(),
            user.getCreatedAt()
        );
    }
}
