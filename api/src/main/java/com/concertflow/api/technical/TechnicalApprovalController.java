package com.concertflow.api.technical;

import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.security.annotation.RequireTechnicalManager;
import com.concertflow.api.technical.dto.ApproveTechnicalRequest;
import com.concertflow.api.technical.dto.RequestTechnicalRevisionRequest;
import com.concertflow.api.technical.dto.SaveTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.SubmitTechnicalRequirementsRequest;
import com.concertflow.api.technical.dto.TechnicalApprovalDashboardResponse;
import com.concertflow.api.technical.dto.TechnicalDetailResponse;
import com.concertflow.api.technical.service.TechnicalApprovalService;
import com.concertflow.api.technical.service.TechnicalRequirementsService;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstants.API_V1_BASE_PATH + "/technical/approval")
@RequiredArgsConstructor
public class TechnicalApprovalController {
    private final TechnicalApprovalService technicalApprovalService;
    private final TechnicalRequirementsService technicalRequirementsService;

    @GetMapping("/pending")
    @RequireTechnicalManager
    public Page<TechnicalApprovalDashboardResponse> getPendingTechnicalApprovals(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(defaultValue = "date") String sortBy,
        @RequestParam(defaultValue = "asc") String direction,
        @RequestParam Long technicalManagerId,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        // Map frontend sortBy names to entity field names
        String entitySortBy;
        switch (sortBy) {
            case "concertDate":
                entitySortBy = "date";
                break;
            case "artistName":
                entitySortBy = "artist.name";
                break;
            case "concertName":
                entitySortBy = "name";
                break;
            default:
                entitySortBy = sortBy;
        }
        Sort sort = Sort.by(Sort.Direction.fromString(direction), entitySortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return technicalApprovalService.getPendingTechnicalApprovals(pageable, technicalManagerId, authenticatedUser);
    }

    @GetMapping("/concert/{concertId}")
    @RequireTechnicalManager
    public TechnicalDetailResponse getTechnicalDetails(
        @PathVariable Long concertId,
        @RequestParam Long technicalManagerId,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        return technicalApprovalService.getTechnicalDetails(concertId, technicalManagerId, authenticatedUser);
    }

    @PostMapping("/concert/{concertId}/approve")
    @RequireTechnicalManager
    public void approveTechnical(
        @PathVariable Long concertId,
        @Valid @RequestBody ApproveTechnicalRequest request,
        @AuthenticationPrincipal User approver
    ) {
        technicalApprovalService.approveTechnical(concertId, request, approver);
    }

    @PostMapping("/concert/{concertId}/request-revision")
    @RequireTechnicalManager
    public void requestTechnicalRevision(
        @PathVariable Long concertId,
        @Valid @RequestBody RequestTechnicalRevisionRequest request,
        @AuthenticationPrincipal User requester
    ) {
        technicalApprovalService.requestRevision(concertId, request, requester);
    }

    @PostMapping("/concert/{concertId}/save")
    @RequireCoordinator
    public void saveTechnicalRequirements(
        @PathVariable Long concertId,
        @Valid @RequestBody SaveTechnicalRequirementsRequest request,
        @AuthenticationPrincipal User coordinator
    ) {
        technicalRequirementsService.saveTechnicalRequirements(concertId, request, coordinator);
    }

    @PostMapping("/concert/{concertId}/submit")
    @RequireCoordinator
    public void submitTechnicalRequirements(
        @PathVariable Long concertId,
        @Valid @RequestBody SubmitTechnicalRequirementsRequest request,
        @AuthenticationPrincipal User submitter
    ) {
        technicalRequirementsService.submitTechnicalRequirements(concertId, request, submitter);
    }

    @GetMapping("/concert/{concertId}/details")
    @RequireCoordinator
    public TechnicalDetailResponse getTechnicalDetailsForCoordinator(
        @PathVariable Long concertId,
        @AuthenticationPrincipal User coordinator
    ) {
        return technicalRequirementsService.getTechnicalDetailsForCoordinator(concertId, coordinator);
    }
}

