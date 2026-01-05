package com.concertflow.api.approval.chain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApprovalChainService {
    @Qualifier("approvalHandlers")
    private final List<ApprovalHandler> handlers;
    
    private ApprovalHandler chain;

    @PostConstruct
    public void configureChain() {
        if (handlers == null || handlers.isEmpty()) {
            log.error("No approval handlers found");
            return;
        }
        
        for (int i = 0; i < handlers.size() - 1; i++) {
            handlers.get(i).setNext(handlers.get(i + 1));
        }
        
        chain = handlers.get(0);
        
        log.info("Approval chain configured successfully with {} handlers", handlers.size());
    }

    public boolean process(ApprovalRequest request) {
        boolean result = chain.handle(request);
        
        if (!result) {
            log.warn("Approval request failed: {} for concert: {}", 
                request.getAction(), request.getConcert().getId());
        }
        return result;
    }
}

