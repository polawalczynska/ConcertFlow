package com.concertflow.api.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank
    String email,

    @NotBlank
    String password,

    Boolean rememberMe
) {
    public LoginRequest(String email, String password, Boolean rememberMe) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe != null ? rememberMe : false;
    }

    public Boolean rememberMe() {
        return Boolean.TRUE.equals(rememberMe);
    }
}


