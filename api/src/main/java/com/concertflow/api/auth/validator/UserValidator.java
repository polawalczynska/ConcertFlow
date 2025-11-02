package com.concertflow.api.auth.validator;

import com.concertflow.api.exceptions.types.UserDisabledException;
import com.concertflow.api.user.entity.User;
import lombok.experimental.UtilityClass;

import static com.concertflow.api.exceptions.ErrorMessage.USER_DISABLED;

@UtilityClass
public class UserValidator {
    public void validateUserIsActive(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if (!user.getActive()) {
            throw new UserDisabledException(USER_DISABLED.message());
        }
    }
}

