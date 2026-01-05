package com.concertflow.api.exceptions.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

/**
 * Factory for creating standardized ProblemDetail responses.
 * Eliminates code duplication in exception handlers.
 */
public final class ProblemDetailFactory {

    private ProblemDetailFactory() {
        // Utility class
    }

    /**
     * Creates a ProblemDetail with the given status, detail message, and title.
     *
     * @param status HTTP status code
     * @param detail Detail message
     * @param title Problem title
     * @return ProblemDetail instance
     */
    public static ProblemDetail create(HttpStatus status, String detail, String title) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle(title);
        return pd;
    }

    /**
     * Creates a ProblemDetail with the given status, detail message, title, and additional property.
     *
     * @param status HTTP status code
     * @param detail Detail message
     * @param title Problem title
     * @param propertyName Name of the additional property
     * @param propertyValue Value of the additional property
     * @return ProblemDetail instance
     */
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

