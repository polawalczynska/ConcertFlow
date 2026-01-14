package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.ApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.budget.dto.ApproveBudgetRequest;
import com.concertflow.api.budget.dto.RequestBudgetRevisionRequest;
import com.concertflow.api.budget.service.BudgetApprovalRecordService;
import com.concertflow.api.budget.service.BudgetItemService;
import com.concertflow.api.budget.service.BudgetRevisionNoteBuilder;
import com.concertflow.api.concert.entity.BudgetApproval;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ApprovalDecision;
import com.concertflow.api.approval.chain.service.FinalApprovalService;
import com.concertflow.api.exceptions.types.BudgetVersionConflictException;
import com.concertflow.api.notification.event.BudgetApprovedEvent;
import com.concertflow.api.notification.event.BudgetRevisionRequestedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class BudgetApprovalHandler extends ApprovalHandler {
    private final ConcertRepository concertRepository;
    private final BudgetApprovalRecordService approvalRecordService;
    private final BudgetItemService budgetItemService;
    private final BudgetRevisionNoteBuilder revisionNoteBuilder;
    private final ApplicationEventPublisher eventPublisher;
    private final FinalApprovalService finalApprovalService;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return request.getAction() == ApprovalRequest.ApprovalAction.APPROVE_BUDGET ||
               request.getAction() == ApprovalRequest.ApprovalAction.REQUEST_BUDGET_REVISION;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        if (request.getAction() == ApprovalRequest.ApprovalAction.APPROVE_BUDGET) {
            return handleApproval(request);
        } else {
            return handleRevisionRequest(request);
        }
    }

    private boolean handleApproval(ApprovalRequest request) {
        log.info("Processing budget approval for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        ApproveBudgetRequest approveRequest = (ApproveBudgetRequest) request.getRequestData();
        
        if (!concert.getBudgetVersion().equals(approveRequest.budgetVersion())) {
            throw new BudgetVersionConflictException("Budget has been modified. Please refresh.");
        }

        if (approveRequest.itemApprovals() != null && !approveRequest.itemApprovals().isEmpty()) {
            budgetItemService.approveBudgetItems(concert, approveRequest.itemApprovals());
        }

        concert.setBudgetStatus(BudgetStatus.APPROVED);
        concert.setBudgetApprovedAt(LocalDateTime.now());
        concert.setBudgetApprovedById(request.getUser().getId());
        concert.setBudget(approveRequest.approvedBudget());
        concert.setApprovedBudget(approveRequest.approvedBudget());

        BudgetApproval approval = approvalRecordService.createApprovalRecord(
            concert,
            request.getUser(),
            ApprovalDecision.APPROVED,
            null
        );
        concert.getBudgetApprovals().add(approval);

        concertRepository.save(concert);
        eventPublisher.publishEvent(new BudgetApprovedEvent(concert, request.getUser()));
        
        finalApprovalService.checkAndSetFinalApproval(concert);
        
        log.info("Budget approved for concert: {}", concert.getId());
        return true;
    }

    private boolean handleRevisionRequest(ApprovalRequest request) {
        log.info("Processing budget revision request for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        RequestBudgetRevisionRequest revisionRequest = (RequestBudgetRevisionRequest) request.getRequestData();
        
        concert.setBudgetStatus(BudgetStatus.REVISION_REQUESTED);

        for (var revisionItem : revisionRequest.requiredChanges()) {
            BudgetItem item = concert.getBudgetItems().stream()
                .filter(bi -> bi.getId().equals(revisionItem.itemId()))
                .findFirst()
                .orElse(null);
            
            if (item != null) {
                String revisionNote = revisionNoteBuilder.buildItemRevisionNote(revisionItem);
                revisionNoteBuilder.applyRevisionNoteToItem(item, revisionNote);
            }
        }

        String comments = revisionNoteBuilder.buildRevisionComments(revisionRequest);
        BudgetApproval revisionApproval = approvalRecordService.createApprovalRecord(
            concert,
            request.getUser(),
            ApprovalDecision.RETURNED_FOR_REVISION,
            comments
        );
        revisionApproval.setRequiresRevision(true);
        concert.getBudgetApprovals().add(revisionApproval);

        String revisionNotes = revisionNoteBuilder.buildRevisionSummaryNotes(revisionRequest);
        concert.setBudgetRejectionReason(revisionNotes);

        concertRepository.save(concert);
        eventPublisher.publishEvent(new BudgetRevisionRequestedEvent(concert, request.getUser()));
        
        log.info("Budget revision requested for concert: {}", concert.getId());
        return true;
    }
}

