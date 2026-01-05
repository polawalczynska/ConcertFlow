package com.concertflow.api.common.service;

import java.util.Optional;
import java.util.function.Supplier;

/**
 * Generic utility for finding entities by ID with consistent error handling.
 * Eliminates code duplication across multiple services.
 */
public final class EntityFinder {

    private EntityFinder() {
        // Utility class
    }

    /**
     * Finds an entity by ID or throws an exception if not found.
     *
     * @param <T> Entity type
     * @param optional Optional entity from repository
     * @param exceptionSupplier Supplier for the exception to throw if not found
     * @return Entity if found
     * @throws RuntimeException if entity not found (exception type depends on supplier)
     */
    public static <T> T findByIdOrThrow(Optional<T> optional, Supplier<? extends RuntimeException> exceptionSupplier) {
        return optional.orElseThrow(exceptionSupplier);
    }
}

