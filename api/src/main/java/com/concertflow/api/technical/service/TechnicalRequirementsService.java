package com.concertflow.api.technical.service;

import com.concertflow.api.approval.chain.ApprovalChainService;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.concert.entity.TechnicalRequirementsRepository;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.mappers.TechnicalMapper;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.technical.dto.SaveTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.SubmitTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.TechnicalDetailResponse;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Lazy
    private final ApprovalChainService approvalChainService;

    @RequireCoordinator
    public void saveTechnicalRequirements(Long concertId, SaveTechnicalRequirementsRequest request, User coordinator) {
        log.info("Saving technical requirements for concert: {}, coordinator ID: {}", concertId, coordinator.getId());

        Concert concert = validateAndGetConcert(concertId, coordinator);
        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        accessValidator.validateTechnicalForEdit(concert);
        updateTechnicalRequirements(requirements, request);
        technicalRequirementsRepository.save(requirements);

        log.info("Technical requirements saved for concert: {}", concertId);
    }

    @RequireCoordinator
    public void submitTechnicalRequirements(
        Long concertId,
        SubmitTechnicalRequirementsRequest request,
        User submitter
    ) {
        log.info("Submitting technical requirements for approval, concert: {}, submitter ID: {}",
            concertId, submitter.getId());

        Concert concert = validateAndGetConcert(concertId, submitter);
        validateBudgetApproved(concert);

        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        accessValidator.validateTechnicalForSubmission(requirements);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(submitter)
            .action(ApprovalRequest.ApprovalAction.SUBMIT_TECHNICAL)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

        log.info("Technical requirements submitted for approval, concert: {}", concertId);
    }

    @RequireCoordinator
    public TechnicalDetailResponse getTechnicalDetailsForCoordinator(Long concertId, User coordinator) {
        Concert concert = validateAndGetConcert(concertId, coordinator);
        return technicalMapper.toDetailResponse(concert);
    }

    private Concert validateAndGetConcert(Long concertId, User coordinator) {
        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);
        return concert;
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

    public TechnicalRequirements getOrCreateTechnicalRequirements(Concert concert) {
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

