package com.concertflow.api.user.dto;

import com.concertflow.api.user.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
    @NotBlank(message = "First name is required")
    String firstName,

    @NotBlank(message = "Last name is required")
    String lastName,

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    String email,

    String phone,

    @NotNull(message = "Role is required")
    Role role,

    String currentPassword,

    @Size(min = 8, message = "Password must be at least 8 characters long")
    String newPassword,

    String confirmPassword
) {
}

