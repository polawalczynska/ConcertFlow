package com.concertflow.api.budget.service;

import com.concertflow.api.budget.dto.BudgetItemApproval;
import com.concertflow.api.budget.dto.BudgetItemResponse;
import com.concertflow.api.budget.dto.CreateBudgetItemRequest;
import com.concertflow.api.budget.dto.UpdateBudgetItemRequest;
import com.concertflow.api.concert.entity.BudgetItem;
import com.concertflow.api.concert.entity.BudgetItemStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.exceptions.types.BudgetItemNotFoundException;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.mappers.BudgetMapper;
import com.concertflow.api.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BudgetItemService {
    private final ConcertRepository concertRepository;
    private final BudgetMapper budgetMapper;

    public BudgetItemResponse createBudgetItem(Long concertId, CreateBudgetItemRequest request, User coordinator) {
        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);
        validateBudgetStatusForEditing(concert);

        BudgetItem item = BudgetItem.builder()
            .concert(concert)
            .category(request.category())
            .name(request.name())
            .description(request.description())
            .estimatedAmount(request.estimatedAmount())
            .approvedAmount(request.estimatedAmount())
            .status(BudgetItemStatus.PLANNED)
            .isMandatory(request.isMandatory() != null ? request.isMandatory() : false)
            .notes(request.notes())
            .build();

        concert.getBudgetItems().add(item);
        updateEstimatedBudget(concert);
        concertRepository.save(concert);

        return budgetMapper.toBudgetItemResponse(item);
    }

    public BudgetItemResponse updateBudgetItem(Long concertId, Long itemId, UpdateBudgetItemRequest request, User coordinator) {
        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);
        validateBudgetStatusForEditing(concert);

        BudgetItem item = findBudgetItem(concert, itemId);
        
        item.setCategory(request.category());
        item.setName(request.name());
        item.setDescription(request.description());
        item.setEstimatedAmount(request.estimatedAmount());
        item.setIsMandatory(request.isMandatory() != null ? request.isMandatory() : false);
        item.setNotes(request.notes());

        if (item.getStatus() == BudgetItemStatus.PLANNED) {
            item.setApprovedAmount(request.estimatedAmount());
        }

        updateEstimatedBudget(concert);
        concertRepository.save(concert);

        return budgetMapper.toBudgetItemResponse(item);
    }

    public void deleteBudgetItem(Long concertId, Long itemId, User coordinator) {
        Concert concert = findConcertById(concertId);
        validateCoordinatorAccess(concert, coordinator);
        validateBudgetStatusForEditing(concert);

        BudgetItem item = findBudgetItem(concert, itemId);
        concert.getBudgetItems().remove(item);
        updateEstimatedBudget(concert);
        concertRepository.save(concert);
    }

    public void approveBudgetItems(Concert concert, List<BudgetItemApproval> itemApprovals) {
        for (BudgetItemApproval itemApproval : itemApprovals) {
            BudgetItem item = findBudgetItem(concert, itemApproval.itemId());
            
            item.setStatus(BudgetItemStatus.APPROVED);
            
            BigDecimal approvedAmount = itemApproval.approvedAmount();
            if (approvedAmount == null) {
                approvedAmount = item.getEstimatedAmount() != null ? item.getEstimatedAmount() : BigDecimal.ZERO;
            }
            item.setApprovedAmount(approvedAmount);

            if (itemApproval.comments() != null && !itemApproval.comments().isBlank()) {
                String existingNotes = item.getNotes() != null ? item.getNotes() : "";
                item.setNotes(existingNotes + (existingNotes.isEmpty() ? "" : "\n") +
                    "Approval: " + itemApproval.comments());
            }
        }
    }

    public BigDecimal calculateTotalEstimatedBudget(Concert concert) {
        if (concert.getBudgetItems() == null || concert.getBudgetItems().isEmpty()) {
            return BigDecimal.ZERO;
        }
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getEstimatedAmount)
            .filter(amount -> amount != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateTotalApprovedBudget(Concert concert) {
        return concert.getBudgetItems().stream()
            .map(BudgetItem::getApprovedAmount)
            .filter(amount -> amount != null && amount.compareTo(BigDecimal.ZERO) > 0)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void updateEstimatedBudget(Concert concert) {
        BigDecimal totalEstimated = calculateTotalEstimatedBudget(concert);
        concert.setEstimatedBudget(totalEstimated);
    }

    private Concert findConcertById(Long concertId) {
        return concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));
    }

    private void validateCoordinatorAccess(Concert concert, User coordinator) {
        if (!concert.getCoordinator().getId().equals(coordinator.getId())) {
            throw new UnauthorizedAccessException("You can only manage budget items for your own concerts");
        }
    }

    private void validateBudgetStatusForEditing(Concert concert) {
        if (concert.getBudgetStatus() == com.concertflow.api.concert.entity.BudgetStatus.APPROVED) {
            throw new com.concertflow.api.exceptions.types.InvalidBudgetStatusException(
                "Cannot modify budget items for an approved budget");
        }
    }

    private BudgetItem findBudgetItem(Concert concert, Long itemId) {
        return concert.getBudgetItems().stream()
            .filter(item -> item.getId().equals(itemId))
            .findFirst()
            .orElseThrow(() -> new BudgetItemNotFoundException(
                "Budget item not found: " + itemId));
    }
}

