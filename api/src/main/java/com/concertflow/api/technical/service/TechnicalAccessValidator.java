package com.concertflow.api.technical.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TechnicalAccessValidator {
    public void validateTechnicalManagerIdMatchesUser(Long technicalManagerId, User authenticatedUser) {
        if (!authenticatedUser.getId().equals(technicalManagerId)) {
            throw new UnauthorizedAccessException("You can only access your own technical approvals");
        }
        if (authenticatedUser.getRole() != Role.TECHNICAL_MANAGER) {
            throw new UnauthorizedAccessException("Only technical managers can access this resource");
        }
    }

    public void validateTechnicalManagerAccessById(Concert concert, Long technicalManagerId) {
        if (concert.getTechnicalManager() == null || !concert.getTechnicalManager().getId().equals(technicalManagerId)) {
            throw new UnauthorizedAccessException("You can only access technical requirements assigned to you");
        }
    }

    public void validateTechnicalManagerAccess(Concert concert, User user) {
        if (concert.getTechnicalManager() == null || !concert.getTechnicalManager().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("You can only access technical requirements assigned to you");
        }
    }

    public void validateTechnicalForApproval(Concert concert) {
        if (concert.getTechnicalStatus() != TechnicalStatus.SUBMITTED &&
            concert.getTechnicalStatus() != TechnicalStatus.REVISION_REQUESTED) {
            throw new IllegalStateException("Technical requirements must be submitted before approval");
        }
    }

    public void validateTechnicalForSubmission(TechnicalRequirements requirements) {
        if (requirements.getPowerRequirements() == null &&
            (requirements.getTechnicalRequirements() == null || requirements.getTechnicalRequirements().isEmpty()) &&
            (requirements.getAudioRequirements() == null || requirements.getAudioRequirements().isEmpty()) &&
            (requirements.getLightingRequirements() == null || requirements.getLightingRequirements().isEmpty()) &&
            (requirements.getSafetyRequirements() == null || requirements.getSafetyRequirements().isEmpty())) {
            throw new IllegalStateException("At least one technical requirement must be filled before submission");
        }
    }
}

