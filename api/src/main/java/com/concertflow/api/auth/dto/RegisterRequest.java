package com.concertflow.api.auth.dto;

import com.concertflow.api.user.entity.Role;
import com.concertflow.api.validation.PasswordMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@PasswordMatch
public record RegisterRequest(
    @Email
    @NotBlank
    String email,

    @NotBlank
    @Size(min = 8)
    String password,

    @NotBlank
    String confirmPassword,

    @NotBlank
    String firstName,

    @NotBlank
    String lastName,

    @NotNull
    Role role
) {
}


