package com.concertflow.api.technical.service;

import com.concertflow.api.concert.entity.ApprovalDecision;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.TechnicalApproval;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TechnicalApprovalRecordService {
    public TechnicalApproval createApprovalRecord(
        Concert concert,
        User user,
        ApprovalDecision decision,
        String comments
    ) {
        return TechnicalApproval.builder()
            .concert(concert)
            .approverId(user.getId())
            .approverName(user.getFirstName() + " " + user.getLastName())
            .approverRole(user.getRole().name())
            .decision(decision)
            .comments(comments)
            .decisionDate(LocalDateTime.now())
            .approvalLevel(1)
            .build();
    }
}

