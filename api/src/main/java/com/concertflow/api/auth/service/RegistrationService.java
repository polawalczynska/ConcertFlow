package com.concertflow.api.auth.service;

import com.concertflow.api.auth.builder.UserBuilder;
import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.auth.validator.RegistrationValidator;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationService {
    private final UserRepository userRepository;
    private final RegistrationValidator validator;
    private final UserBuilder userBuilder;

    public void register(RegisterRequest registerRequest) {
        validator.validate(registerRequest);
        User user = userBuilder.buildFromRegistration(registerRequest);
        userRepository.save(user);
    }
}

