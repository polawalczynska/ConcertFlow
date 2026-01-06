package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.AbstractApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.approval.chain.service.FinalApprovalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class FinalApprovalHandler extends AbstractApprovalHandler {
    private final FinalApprovalService finalApprovalService;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return true;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        Concert concert = request.getConcert();
        finalApprovalService.checkAndSetFinalApproval(concert);
        return true;
    }
}

