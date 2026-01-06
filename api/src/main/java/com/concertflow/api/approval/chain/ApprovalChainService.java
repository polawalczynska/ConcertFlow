package com.concertflow.api.approval.chain;

import com.concertflow.api.approval.chain.handler.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApprovalChainService {
    private final BudgetSubmissionHandler budgetSubmissionHandler;
    private final BudgetApprovalHandler budgetApprovalHandler;
    private final TechnicalSubmissionHandler technicalSubmissionHandler;
    private final TechnicalApprovalHandler technicalApprovalHandler;
    private final FinalApprovalHandler finalApprovalHandler;
    
    private ApprovalHandler chain;

    @PostConstruct
    public void configureChain() {
        budgetSubmissionHandler.setNext(budgetApprovalHandler);
        budgetApprovalHandler.setNext(technicalSubmissionHandler);
        technicalSubmissionHandler.setNext(technicalApprovalHandler);
        technicalApprovalHandler.setNext(finalApprovalHandler);
        
        chain = budgetSubmissionHandler;
        
        log.info("Approval chain configured successfully");
    }

    public boolean process(ApprovalRequest request) {
        return chain.handle(request);
    }
}

