package com.concertflow.api.approval.chain;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class ApprovalRequest {
    private final Concert concert;
    private final User user;
    private final ApprovalAction action;
    private final Object requestData;
    
    public enum ApprovalAction {
        SUBMIT_BUDGET,
        APPROVE_BUDGET,
        REQUEST_BUDGET_REVISION,
        SUBMIT_TECHNICAL,
        APPROVE_TECHNICAL,
        REQUEST_TECHNICAL_REVISION
    }
}

