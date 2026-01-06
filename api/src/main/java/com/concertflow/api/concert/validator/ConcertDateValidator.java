package com.concertflow.api.concert.validator;

import com.concertflow.api.config.ApiConstants;
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

    public void validateConcertDate(LocalDateTime date) {
        if (date == null) {
            throw new ConcertValidationException("Concert date cannot be null");
        }
        LocalDate concertDate = date.toLocalDate();
        LocalDate today = LocalDate.now();
        long daysBetween = ChronoUnit.DAYS.between(today, concertDate);
        
        if (daysBetween < ApiConstants.DAYS_IN_TWO_WEEKS) {
            throw new ConcertValidationException(ErrorMessage.INVALID_CONCERT_DATE.message());
        }
    }
}

