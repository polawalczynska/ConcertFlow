package com.concertflow.api.concert.service;

import com.concertflow.api.approval.entity.Approval;
import com.concertflow.api.approval.entity.ApprovalRepository;
import com.concertflow.api.approval.entity.ApprovalType;
import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.service.interfaces.ConcertService;
import com.concertflow.api.concert.validator.ConcertBudgetValidator;
import com.concertflow.api.concert.validator.ConcertDateValidator;
import com.concertflow.api.exceptions.types.ArtistNotFoundException;
import com.concertflow.api.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.ARTIST_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ConcertServiceImpl implements ConcertService {
    private final ApprovalRepository approvalRepository;
    private final ConcertRepository concertRepository;
    private final ArtistRepository artistRepository;
    private final ConcertBudgetValidator budgetValidator;
    private final ConcertDateValidator dateValidator;

    @Override
    public void createConcert(ConcertRequest request, User coordinator) {
        validateConcertRequest(request);

        Artist artist = artistRepository.findById(request.artistId())
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));

        Concert concert = Concert.builder()
            .name(request.name())
            .date(request.date())
            .venue(request.venue())
            .budget(request.budget())
            .description(request.description())
            .artist(artist)
            .coordinator(coordinator)
            .build();

        createApprovalWorkflow(concert);
        concertRepository.save(concert);
    }

    private void validateConcertRequest(ConcertRequest request) {
        budgetValidator.validateBudget(request.budget());
        dateValidator.validateConcertDate(request.date());
    }

    private void createApprovalWorkflow(Concert concert) {
        Approval budgetApproval = buildApproval(concert, ApprovalType.BUDGET);
        Approval technicalApproval = buildApproval(concert, ApprovalType.TECHNICAL);

        approvalRepository.save(budgetApproval);
        approvalRepository.save(technicalApproval);
    }

    private Approval buildApproval(Concert concert, ApprovalType type) {
        return Approval.builder()
            .type(type)
            .concert(concert)
            .build();
    }
}
