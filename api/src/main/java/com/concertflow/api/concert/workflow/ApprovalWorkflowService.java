package com.concertflow.api.concert.workflow;

import com.concertflow.api.approval.entity.Approval;
import com.concertflow.api.approval.entity.ApprovalType;
import com.concertflow.api.concert.entity.Concert;
import org.springframework.stereotype.Component;

@Component
public class ApprovalWorkflowService {
    public void createApprovalWorkflow(Concert concert) {
        Approval budgetApproval = buildApproval(concert, ApprovalType.BUDGET);
        Approval technicalApproval = buildApproval(concert, ApprovalType.TECHNICAL);

        concert.getApprovals().add(budgetApproval);
        concert.getApprovals().add(technicalApproval);
    }

    private Approval buildApproval(Concert concert, ApprovalType type) {
        return Approval.builder()
            .type(type)
            .concert(concert)
            .build();
    }
}

