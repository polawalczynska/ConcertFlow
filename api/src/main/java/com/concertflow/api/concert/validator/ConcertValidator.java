package com.concertflow.api.concert.validator;

import com.concertflow.api.concert.dto.ConcertRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConcertValidator {
    private final ConcertBudgetValidator budgetValidator;
    private final ConcertDateValidator dateValidator;

    public void validate(ConcertRequest request) {
        budgetValidator.validateBudget(request.budget());
        dateValidator.validateConcertDate(request.date());
    }

    public void validateForUpdate(ConcertRequest request) {
        budgetValidator.validateBudget(request.budget());
    }
}

