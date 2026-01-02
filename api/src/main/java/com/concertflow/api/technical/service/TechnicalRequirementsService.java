package com.concertflow.api.technical.service;

import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.mappers.TechnicalMapper;
import com.concertflow.api.notification.event.TechnicalSubmittedEvent;
import com.concertflow.api.technical.dto.SaveTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.SubmitTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.TechnicalDetailResponse;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TechnicalRequirementsService {
    private final ConcertRepository concertRepository;
    private final TechnicalRequirementsRepository technicalRequirementsRepository;
    private final TechnicalMapper technicalMapper;
    private final TechnicalAccessValidator accessValidator;
    private final TechnicalRequirementsJsonService jsonService;
    private final ApplicationEventPublisher eventPublisher;

    @PreAuthorize("hasRole('COORDINATOR')")
    public void saveTechnicalRequirements(Long concertId, SaveTechnicalRequirementsRequest request, User coordinator) {
        log.info("Saving technical requirements for concert: {}, coordinator: {}", concertId, coordinator.getEmail());

        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);
        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        accessValidator.validateTechnicalForEdit(concert);
        updateTechnicalRequirements(requirements, request);
        technicalRequirementsRepository.save(requirements);

        log.info("Technical requirements saved for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('COORDINATOR')")
    public void submitTechnicalRequirements(
        Long concertId,
        SubmitTechnicalRequirementsRequest request,
        User submitter
    ) {
        log.info("Submitting technical requirements for approval, concert: {}, submitter: {}",
            concertId, submitter.getEmail());

        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, submitter);
        validateBudgetApproved(concert);

        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        accessValidator.validateTechnicalForSubmission(requirements);

        concert.setTechnicalStatus(TechnicalStatus.SUBMITTED);
        requirements.setStatus(TechnicalStatus.SUBMITTED);
        requirements.setSubmittedAt(LocalDateTime.now());
        requirements.setVersion(requirements.getVersion() + 1);

        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);
        
        eventPublisher.publishEvent(new TechnicalSubmittedEvent(concert, submitter));

        log.info("Technical requirements submitted for approval, concert: {}", concertId);
    }

    @PreAuthorize("hasRole('COORDINATOR')")
    public TechnicalDetailResponse getTechnicalDetailsForCoordinator(Long concertId, User coordinator) {
        log.debug("Fetching technical details for concert: {}, coordinator: {}", concertId, coordinator.getId());

        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);

        return technicalMapper.toDetailResponse(concert);
    }

    private void validateCoordinatorAccess(Concert concert, User coordinator) {
        if (!concert.getCoordinator().getId().equals(coordinator.getId())) {
            throw new UnauthorizedAccessException(
                "You can only access technical requirements for your own concerts");
        }
    }

    private void validateBudgetApproved(Concert concert) {
        if (concert.getBudgetStatus() != BudgetStatus.APPROVED) {
            throw new IllegalStateException("Budget must be approved before adding technical requirements");
        }
    }

    private void updateTechnicalRequirements(TechnicalRequirements requirements, SaveTechnicalRequirementsRequest request) {
        requirements.setPowerRequirements(request.powerRequirements());
        requirements.setTechnicalRequirements(request.technicalRequirements());
        requirements.setTechnicalFlags(request.technicalFlags() != null
            ? String.join(",", request.technicalFlags())
            : null);

        if (request.audio() != null) {
            requirements.setAudioRequirements(jsonService.serializeAudioRequirements(request.audio()));
        }
        if (request.lighting() != null) {
            requirements.setLightingRequirements(jsonService.serializeLightingRequirements(request.lighting()));
        }
        if (request.safety() != null) {
            requirements.setSafetyRequirements(jsonService.serializeSafetyRequirements(request.safety()));
        }
    }

    TechnicalRequirements getOrCreateTechnicalRequirements(Concert concert) {
        return technicalRequirementsRepository.findByConcertId(concert.getId())
            .orElseGet(() -> {
                TechnicalRequirements requirements = TechnicalRequirements.builder()
                    .concert(concert)
                    .status(TechnicalStatus.PENDING)
                    .version(1)
                    .build();
                return technicalRequirementsRepository.save(requirements);
            });
    }

    private Concert findConcertById(Long concertId) {
        return concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));
    }
}

