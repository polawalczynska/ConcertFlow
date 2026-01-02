package com.concertflow.api.approval.chain;

public interface ApprovalHandler {
    boolean handle(ApprovalRequest request);
    
    void setNext(ApprovalHandler next);
}

