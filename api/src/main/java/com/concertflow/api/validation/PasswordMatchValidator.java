package com.concertflow.api.validation;

import com.concertflow.api.auth.dto.RegisterRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, RegisterRequest> {
    @Override
    public void initialize(PasswordMatch constraintAnnotation) {
    }

    @Override
    public boolean isValid(RegisterRequest registerRequest, ConstraintValidatorContext context) {
        if(registerRequest.password() == null || registerRequest.confirmPassword() == null) {
            return false;
        }

        boolean isValid = registerRequest.password().equals(registerRequest.confirmPassword());

        if(!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                .addPropertyNode("confirmPassword")
                .addConstraintViolation();
        }

        return isValid;
    }
}
