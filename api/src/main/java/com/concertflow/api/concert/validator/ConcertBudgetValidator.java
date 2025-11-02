package com.concertflow.api.concert.validator;

import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.ConcertValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class ConcertBudgetValidator {
    public void validateBudget(BigDecimal budget) {
        if (budget == null || budget.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ConcertValidationException(ErrorMessage.INVALID_BUDGET.message());
        }
    }
}

