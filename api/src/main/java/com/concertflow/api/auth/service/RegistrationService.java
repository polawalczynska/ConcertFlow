package com.concertflow.api.auth.service;

import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.email())) {
            throw new EmailAlreadyExistsException(ErrorMessage.EMAIL_EXISTS.message());
        }

        User user = User.builder()
            .email(registerRequest.email())
            .password(passwordEncoder.encode(registerRequest.password()))
            .firstName(registerRequest.firstName())
            .lastName(registerRequest.lastName())
            .role(registerRequest.role())
            .active(true)
            .build();

        userRepository.save(user);
    }
}

