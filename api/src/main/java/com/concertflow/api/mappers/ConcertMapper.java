package com.concertflow.api.mappers;

import com.concertflow.api.approval.dto.ApprovalResponse;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.Concert;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ConcertMapper {
    public ConcertResponse toResponse(Concert concert) {
        return new ConcertResponse(
            concert.getId(),
            concert.getName(),
            concert.getDate(),
            concert.getVenue(),
            concert.getCity(),
            concert.getStatus(),
            concert.getBudget(),
            concert.getDescription(),
            concert.getCancellationReason(),
            concert.getCoordinator() != null ? concert.getCoordinator().getId() : null,
            concert.getCoordinator() != null
                ? concert.getCoordinator().getFirstName() + " " + concert.getCoordinator().getLastName()
                : null,
            concert.getArtist() != null ? concert.getArtist().getId() : null,
            concert.getArtist() != null ? concert.getArtist().getName() : null,
            concert.getBudgetManager() != null ? concert.getBudgetManager().getId() : null,
            concert.getBudgetManager() != null
                ? concert.getBudgetManager().getFirstName() + " " + concert.getBudgetManager().getLastName()
                : null,
            concert.getBudgetStatus(),
            mapApprovals(concert),
            concert.getCreatedAt()
        );
    }

    private List<ApprovalResponse> mapApprovals(Concert concert) {
        if (concert.getApprovals() == null) {
            return List.of();
        }
        return concert.getApprovals().stream()
            .map(approval -> new ApprovalResponse(
                approval.getId(),
                approval.getType(),
                approval.getStatus(),
                approval.getComments(),
                approval.getDecisionDate(),
                approval.getCreatedAt(),
                approval.getConcert() != null ? approval.getConcert().getId() : null,
                approval.getConcert() != null ? approval.getConcert().getName() : null,
                approval.getApprover() != null ? approval.getApprover().getId() : null,
                approval.getApprover() != null
                    ? approval.getApprover().getFirstName() + " " + approval.getApprover().getLastName()
                    : null
            ))
            .toList();
    }
}

