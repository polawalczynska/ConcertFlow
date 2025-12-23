package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.BudgetItemApproval;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetItemStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.exceptions.types.BudgetItemNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetItemService {
    public void approveBudgetItems(Concert concert, List<BudgetItemApproval> itemApprovals) {
        for (BudgetItemApproval itemApproval : itemApprovals) {
            BudgetItem item = findBudgetItem(concert, itemApproval.itemId());
            
            item.setStatus(BudgetItemStatus.APPROVED);
            item.setApprovedAmount(itemApproval.approvedAmount());

            if (itemApproval.comments() != null && !itemApproval.comments().isBlank()) {
                String existingNotes = item.getNotes() != null ? item.getNotes() : "";
                item.setNotes(existingNotes + (existingNotes.isEmpty() ? "" : "\n") +
                    "Approval: " + itemApproval.comments());
            }
        }
    }

    public BigDecimal calculateTotalApprovedBudget(Concert concert) {
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getApprovedAmount)
            .filter(amount -> amount != null && amount.compareTo(BigDecimal.ZERO) > 0)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BudgetItem findBudgetItem(Concert concert, Long itemId) {
        return concert.getBudgetItems().stream()
            .filter(item -> item.getId().equals(itemId))
            .findFirst()
            .orElseThrow(() -> new BudgetItemNotFoundException(
                "Budget item not found: " + itemId));
    }
}

