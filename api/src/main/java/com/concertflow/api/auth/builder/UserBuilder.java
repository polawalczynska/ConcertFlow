package com.concertflow.api.auth.builder;

import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.user.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserBuilder {
    private final PasswordEncoder passwordEncoder;

    public User buildFromRegistration(RegisterRequest registerRequest) {
        return User.builder()
            .email(registerRequest.email())
            .password(passwordEncoder.encode(registerRequest.password()))
            .firstName(registerRequest.firstName())
            .lastName(registerRequest.lastName())
            .phone(registerRequest.phone())
            .role(registerRequest.role())
            .active(true)
            .build();
    }
}

