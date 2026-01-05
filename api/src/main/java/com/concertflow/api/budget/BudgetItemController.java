package com.concertflow.api.budget;

import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.budget.dto.BudgetItemResponse;
import com.concertflow.api.budget.dto.CreateBudgetItemRequest;
import com.concertflow.api.budget.dto.UpdateBudgetItemRequest;
import com.concertflow.api.budget.service.BudgetItemService;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiConstants.API_V1_BASE_PATH + "/concerts/{concertId}/budget-items")
@RequiredArgsConstructor
public class BudgetItemController {
    private final BudgetItemService budgetItemService;

    @PostMapping
    @RequireCoordinator
    @ResponseStatus(HttpStatus.CREATED)
    public BudgetItemResponse createBudgetItem(
        @PathVariable Long concertId,
        @Valid @RequestBody CreateBudgetItemRequest request,
        @AuthenticationPrincipal User coordinator
    ) {
        return budgetItemService.createBudgetItem(concertId, request, coordinator);
    }

    @PutMapping("/{itemId}")
    @RequireCoordinator
    public BudgetItemResponse updateBudgetItem(
        @PathVariable Long concertId,
        @PathVariable Long itemId,
        @Valid @RequestBody UpdateBudgetItemRequest request,
        @AuthenticationPrincipal User coordinator
    ) {
        return budgetItemService.updateBudgetItem(concertId, itemId, request, coordinator);
    }

    @DeleteMapping("/{itemId}")
    @RequireCoordinator
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBudgetItem(
        @PathVariable Long concertId,
        @PathVariable Long itemId,
        @AuthenticationPrincipal User coordinator
    ) {
        budgetItemService.deleteBudgetItem(concertId, itemId, coordinator);
    }
}

