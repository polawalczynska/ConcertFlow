package com.concertflow.api.exceptions.handler;

import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.exceptions.types.InvalidCredentialsException;
import com.concertflow.api.exceptions.types.TokenRefreshException;
import com.concertflow.api.exceptions.types.UserDisabledException;
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
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        pd.setTitle("EMAIL_ALREADY_EXISTS");
        return pd;
    }

    @ExceptionHandler({InvalidCredentialsException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleInvalidCredentials(Exception ex) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
        pd.setTitle("INVALID_CREDENTIALS");
        return pd;
    }

    @ExceptionHandler(TokenRefreshException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ProblemDetail handleTokenRefreshException(TokenRefreshException ex) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
        pd.setTitle("INVALID_REFRESH_TOKEN");
        return pd;
    }

    @ExceptionHandler({UserDisabledException.class, DisabledException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ProblemDetail handleUserDisabledException(Exception ex) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        pd.setTitle("USER_DISABLED");
        return pd;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());

        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed");
        pd.setTitle("VALIDATION_ERROR");
        pd.setProperty("errors", errors);
        return pd;
    }
}


