package com.concertflow.api.auth.service.interfaces;

import com.concertflow.api.auth.dto.RegisterRequest;

public interface RegistrationService {
    void register(RegisterRequest registerRequest);
}

