package com.concertflow.api.auth.validator;

import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegistrationValidator {
    private final UserRepository userRepository;

    public void validate(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.email())) {
            throw new EmailAlreadyExistsException(ErrorMessage.EMAIL_EXISTS.message());
        }
    }
}

