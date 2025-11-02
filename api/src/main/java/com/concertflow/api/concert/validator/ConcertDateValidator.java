package com.concertflow.api.concert.validator;

import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.ConcertValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ConcertDateValidator {
    public void validateConcertDate(LocalDateTime date) {
        if (date == null) {
            throw new ConcertValidationException("Concert date cannot be null");
        }
        LocalDate concertDate = date.toLocalDate();
        LocalDate minimumDate = LocalDate.now().plusDays(14);
        if (concertDate.isBefore(minimumDate)) {
            throw new ConcertValidationException(ErrorMessage.INVALID_CONCERT_DATE.message());
        }
    }
}

