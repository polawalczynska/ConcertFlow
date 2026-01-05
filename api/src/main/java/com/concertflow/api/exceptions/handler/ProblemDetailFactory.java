package com.concertflow.api.exceptions.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public final class ProblemDetailFactory {

    private ProblemDetailFactory() {
    }

    public static ProblemDetail create(HttpStatus status, String detail, String title) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle(title);
        return pd;
    }

    public static ProblemDetail createWithProperty(
            HttpStatus status,
            String detail,
            String title,
            String propertyName,
            Object propertyValue
    ) {
        ProblemDetail pd = create(status, detail, title);
        pd.setProperty(propertyName, propertyValue);
        return pd;
    }
}

