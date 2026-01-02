package com.concertflow.api.approval.chain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractApprovalHandler implements ApprovalHandler {
    protected ApprovalHandler next;

    @Override
    public void setNext(ApprovalHandler next) {
        this.next = next;
    }

    @Override
    public boolean handle(ApprovalRequest request) {
        if (canHandle(request)) {
            log.debug("Handler {} is processing request: {}", this.getClass().getSimpleName(), request.getAction());
            return process(request);
        }
        
        if (next != null) {
            log.debug("Handler {} cannot handle request, passing to next handler", this.getClass().getSimpleName());
            return next.handle(request);
        }
        
        log.warn("No handler found for request: {}", request.getAction());
        return false;
    }

    protected abstract boolean canHandle(ApprovalRequest request);

    protected abstract boolean process(ApprovalRequest request);
}

