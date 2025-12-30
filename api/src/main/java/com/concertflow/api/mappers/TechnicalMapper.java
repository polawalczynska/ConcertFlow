package com.concertflow.api.mappers;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.technical.dto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class TechnicalMapper {
    private final ObjectMapper objectMapper;

    public TechnicalApprovalDashboardResponse toDashboardResponse(Concert concert, List<String> flags) {
        int daysUntilConcert = calculateDaysUntil(concert.getDate());
        TechnicalRequirements requirements = concert.getTechnicalRequirements();

        return TechnicalApprovalDashboardResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .venue(concert.getVenue())
            .city(concert.getCity())
            .technicalStatus(concert.getTechnicalStatus())
            .powerRequirements(requirements != null ? requirements.getPowerRequirements() : null)
            .technicalFlags(flags != null ? flags : new ArrayList<>())
            .daysUntil(daysUntilConcert)
            .submittedAt(requirements != null ? requirements.getSubmittedAt() : null)
            .build();
    }

    public TechnicalDetailResponse toDetailResponse(Concert concert) {
        TechnicalRequirements requirements = concert.getTechnicalRequirements();

        List<String> technicalFlags = new ArrayList<>();
        if (requirements != null && requirements.getTechnicalFlags() != null) {
            technicalFlags = Arrays.asList(requirements.getTechnicalFlags().split(","));
        }

        AudioRequirementsDto audio = null;
        LightingRequirementsDto lighting = null;
        SafetyRequirementsDto safety = null;

        if (requirements != null) {
            try {
                if (requirements.getAudioRequirements() != null && !requirements.getAudioRequirements().isEmpty()) {
                    audio = objectMapper.readValue(requirements.getAudioRequirements(), AudioRequirementsDto.class);
                }
                if (requirements.getLightingRequirements() != null && !requirements.getLightingRequirements().isEmpty()) {
                    lighting = objectMapper.readValue(requirements.getLightingRequirements(), LightingRequirementsDto.class);
                }
                if (requirements.getSafetyRequirements() != null && !requirements.getSafetyRequirements().isEmpty()) {
                    safety = objectMapper.readValue(requirements.getSafetyRequirements(), SafetyRequirementsDto.class);
                }
            } catch (JsonProcessingException e) {
                log.error("Error deserializing technical requirements from JSON", e);
            }
        }

        return TechnicalDetailResponse.builder()
            .concertId(concert.getId())
            .concertName(concert.getName())
            .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown")
            .concertDate(concert.getDate())
            .venue(concert.getVenue())
            .city(concert.getCity())
            .technicalStatus(concert.getTechnicalStatus())
            .powerRequirements(requirements != null ? requirements.getPowerRequirements() : null)
            .technicalRequirements(requirements != null ? requirements.getTechnicalRequirements() : null)
            .technicalFlags(technicalFlags)
            .audio(audio)
            .lighting(lighting)
            .safety(safety)
            .submittedAt(requirements != null ? requirements.getSubmittedAt() : null)
            .approvedAt(requirements != null ? requirements.getApprovedAt() : null)
            .approvedById(requirements != null ? requirements.getApprovedById() : null)
            .version(requirements != null ? requirements.getVersion() : 1)
            .build();
    }

    private int calculateDaysUntil(LocalDateTime date) {
        if (date == null) {
            return 0;
        }
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, date);
        long days = duration.toDays();
        return (int) Math.max(0, days);
    }
}

