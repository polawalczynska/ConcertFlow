package com.concertflow.api.approval.chain.config;

import com.concertflow.api.approval.chain.ApprovalHandler;
import com.concertflow.api.approval.chain.handler.BudgetApprovalHandler;
import com.concertflow.api.approval.chain.handler.BudgetSubmissionHandler;
import com.concertflow.api.approval.chain.handler.FinalApprovalHandler;
import com.concertflow.api.approval.chain.handler.TechnicalApprovalHandler;
import com.concertflow.api.approval.chain.handler.TechnicalSubmissionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class ApprovalChainConfig {
    private final BudgetSubmissionHandler budgetSubmissionHandler;
    private final BudgetApprovalHandler budgetApprovalHandler;
    private final TechnicalSubmissionHandler technicalSubmissionHandler;
    private final TechnicalApprovalHandler technicalApprovalHandler;
    private final FinalApprovalHandler finalApprovalHandler;

    @Bean
    public List<ApprovalHandler> approvalHandlers() {
        return List.of(
            budgetSubmissionHandler,
            budgetApprovalHandler,
            technicalSubmissionHandler,
            technicalApprovalHandler,
            finalApprovalHandler
        );
    }
}

