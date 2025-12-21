package com.concertflow.api.concert.validator;

import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.ConcertValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class ConcertDateValidator {
    private static final long MINIMUM_DAYS_IN_ADVANCE = 14;

    public void validateConcertDate(LocalDateTime date) {
        if (date == null) {
            throw new ConcertValidationException("Concert date cannot be null");
        }
        LocalDate concertDate = date.toLocalDate();
        LocalDate today = LocalDate.now();
        long daysBetween = ChronoUnit.DAYS.between(today, concertDate);
        
        if (daysBetween < MINIMUM_DAYS_IN_ADVANCE) {
            throw new ConcertValidationException(ErrorMessage.INVALID_CONCERT_DATE.message());
        }
    }
}

