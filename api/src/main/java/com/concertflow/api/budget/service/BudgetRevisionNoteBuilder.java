package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.RevisionItem;
import com.concertflow.api.budget.dto.RequestBudgetRevisionRequest;
import com.concertflow.api.concert.entity.BudgetItem;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class BudgetRevisionNoteBuilder {

    public String buildItemRevisionNote(RevisionItem revisionItem) {
        StringBuilder revisionNote = new StringBuilder();
        revisionNote.append("REVISION REQUESTED:\n");
        revisionNote.append("Reason: ").append(revisionItem.changeReason()).append("\n");
        
        if (revisionItem.suggestedAmount() != null && !revisionItem.suggestedAmount().isBlank()) {
            revisionNote.append("Suggested Amount: $").append(revisionItem.suggestedAmount()).append("\n");
        }
        
        if (revisionItem.notes() != null && !revisionItem.notes().isBlank()) {
            revisionNote.append("Notes: ").append(revisionItem.notes()).append("\n");
        }
        
        return revisionNote.toString();
    }

    public void applyRevisionNoteToItem(BudgetItem item, String revisionNote) {
        String existingNotes = item.getNotes() != null ? item.getNotes() : "";
        if (!existingNotes.isEmpty() && !existingNotes.contains("REVISION REQUESTED")) {
            item.setNotes(existingNotes + "\n\n" + revisionNote);
        } else {
            item.setNotes(revisionNote);
        }
    }

    public String buildRevisionSummaryNotes(RequestBudgetRevisionRequest request) {
        StringBuilder notes = new StringBuilder();
        notes.append("Required revisions:\n");
        String itemsSummary = request.requiredChanges().stream()
            .map(item -> "- Item ID: " + item.itemId() + ", Reason: " + item.changeReason())
            .collect(Collectors.joining("\n"));
        notes.append(itemsSummary);
        notes.append("\nRevision deadline: ").append(request.deadline());
        return notes.toString();
    }

    public String buildRevisionComments(RequestBudgetRevisionRequest request) {
        return request.revisionReason() + "\nDeadline: " + request.deadline().toString();
    }
}

