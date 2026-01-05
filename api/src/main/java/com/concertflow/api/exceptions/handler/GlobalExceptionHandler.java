package com.concertflow.api.exceptions.handler;

import com.concertflow.api.exceptions.types.AlreadyTeamMemberException;
import com.concertflow.api.exceptions.types.ArtistAlreadyExistsException;
import com.concertflow.api.exceptions.types.ArtistNotFoundException;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.exceptions.types.ConcertValidationException;
import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.exceptions.types.InvalidConcertStatusTransitionException;
import com.concertflow.api.exceptions.types.InvalidCredentialsException;
import com.concertflow.api.exceptions.types.InvalidInvitationStatusException;
import com.concertflow.api.exceptions.types.PendingInvitationExistsException;
import com.concertflow.api.exceptions.types.TeamInvitationNotFoundException;
import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.exceptions.types.TokenRefreshException;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.exceptions.types.UserDisabledException;
import com.concertflow.api.exceptions.handler.ProblemDetailFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "EMAIL_ALREADY_EXISTS");
    }

    @ExceptionHandler({InvalidCredentialsException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleInvalidCredentials(Exception ex) {
        return ProblemDetailFactory.create(HttpStatus.UNAUTHORIZED, ex.getMessage(), "INVALID_CREDENTIALS");
    }

    @ExceptionHandler(TokenRefreshException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleTokenRefreshException(TokenRefreshException ex) {
        return ProblemDetailFactory.create(HttpStatus.UNAUTHORIZED, ex.getMessage(), "INVALID_REFRESH_TOKEN");
    }

    @ExceptionHandler({UserDisabledException.class, DisabledException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ProblemDetail handleUserDisabledException(Exception ex) {
        return ProblemDetailFactory.create(HttpStatus.FORBIDDEN, ex.getMessage(), "USER_DISABLED");
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ProblemDetail handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        return ProblemDetailFactory.create(HttpStatus.FORBIDDEN, ex.getMessage(), "UNAUTHORIZED_ACCESS");
    }

    @ExceptionHandler(ArtistNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail handleArtistNotFoundException(ArtistNotFoundException ex) {
        return ProblemDetailFactory.create(HttpStatus.NOT_FOUND, ex.getMessage(), "ARTIST_NOT_FOUND");
    }

    @ExceptionHandler(ArtistAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleArtistAlreadyExistsException(ArtistAlreadyExistsException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "ARTIST_ALREADY_EXISTS");
    }

    @ExceptionHandler(ConcertNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail handleConcertNotFoundException(ConcertNotFoundException ex) {
        return ProblemDetailFactory.create(HttpStatus.NOT_FOUND, ex.getMessage(), "CONCERT_NOT_FOUND");
    }

    @ExceptionHandler(ConcertValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleConcertValidationException(ConcertValidationException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "CONCERT_VALIDATION_ERROR");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());

        return ProblemDetailFactory.createWithProperty(
            HttpStatus.BAD_REQUEST,
            "Validation failed",
            "VALIDATION_ERROR",
            "errors",
            errors
        );
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleIllegalStateException(IllegalStateException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "ILLEGAL_STATE");
    }

    @ExceptionHandler(TeamInvitationNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail handleTeamInvitationNotFoundException(TeamInvitationNotFoundException ex) {
        return ProblemDetailFactory.create(HttpStatus.NOT_FOUND, ex.getMessage(), "TEAM_INVITATION_NOT_FOUND");
    }

    @ExceptionHandler(PendingInvitationExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handlePendingInvitationExistsException(PendingInvitationExistsException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "PENDING_INVITATION_EXISTS");
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException ex) {
        return ProblemDetailFactory.create(HttpStatus.NOT_FOUND, ex.getMessage(), "USER_NOT_FOUND");
    }

    @ExceptionHandler(InvalidInvitationStatusException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleInvalidInvitationStatusException(InvalidInvitationStatusException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "INVALID_INVITATION_STATUS");
    }

    @ExceptionHandler(AlreadyTeamMemberException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleAlreadyTeamMemberException(AlreadyTeamMemberException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "ALREADY_TEAM_MEMBER");
    }

    @ExceptionHandler(InvalidConcertStatusTransitionException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleInvalidConcertStatusTransitionException(InvalidConcertStatusTransitionException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "INVALID_CONCERT_STATUS_TRANSITION");
    }

    @ExceptionHandler(InvalidConcertStatusException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleInvalidConcertStatusException(InvalidConcertStatusException ex) {
        return ProblemDetailFactory.create(HttpStatus.BAD_REQUEST, ex.getMessage(), "INVALID_CONCERT_STATUS");
    }
}


