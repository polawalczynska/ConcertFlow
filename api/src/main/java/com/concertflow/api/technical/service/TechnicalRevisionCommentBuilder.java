package com.concertflow.api.technical.service;

import com.concertflow.api.technical.dto.RequestTechnicalRevisionRequest;
import org.springframework.stereotype.Component;

@Component
public class TechnicalRevisionCommentBuilder {
    public String buildRevisionComments(RequestTechnicalRevisionRequest request) {
        StringBuilder comments = new StringBuilder();
        comments.append("Revision Reason: ").append(request.revisionReason()).append("\n\n");
        comments.append("Required Changes:\n");
        for (var item : request.requiredChanges()) {
            comments.append("- ").append(item.areaId()).append(": ").append(item.changeReason());
            if (item.notes() != null && !item.notes().isEmpty()) {
                comments.append(" (").append(item.notes()).append(")");
            }
            comments.append("\n");
        }
        comments.append("\nDeadline: ").append(request.deadline().toString());
        return comments.toString();
    }
}

