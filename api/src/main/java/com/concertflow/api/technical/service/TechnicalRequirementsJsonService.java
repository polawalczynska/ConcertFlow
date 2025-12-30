package com.concertflow.api.technical.service;

import com.concertflow.api.technical.dto.AudioRequirementsDto;
import com.concertflow.api.technical.dto.LightingRequirementsDto;
import com.concertflow.api.technical.dto.SafetyRequirementsDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TechnicalRequirementsJsonService {
    private final ObjectMapper objectMapper;

    public String serializeAudioRequirements(AudioRequirementsDto audio) {
        if (audio == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(audio);
        } catch (JsonProcessingException e) {
            log.error("Error serializing audio requirements to JSON", e);
            throw new RuntimeException("Error serializing audio requirements", e);
        }
    }

    public String serializeLightingRequirements(LightingRequirementsDto lighting) {
        if (lighting == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(lighting);
        } catch (JsonProcessingException e) {
            log.error("Error serializing lighting requirements to JSON", e);
            throw new RuntimeException("Error serializing lighting requirements", e);
        }
    }

    public String serializeSafetyRequirements(SafetyRequirementsDto safety) {
        if (safety == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(safety);
        } catch (JsonProcessingException e) {
            log.error("Error serializing safety requirements to JSON", e);
            throw new RuntimeException("Error serializing safety requirements", e);
        }
    }
}

