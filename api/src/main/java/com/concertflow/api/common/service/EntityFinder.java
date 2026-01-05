package com.concertflow.api.common.service;

import java.util.Optional;
import java.util.function.Supplier;

public final class EntityFinder {

    private EntityFinder() {
    }

    public static <T> T findByIdOrThrow(Optional<T> optional, Supplier<? extends RuntimeException> exceptionSupplier) {
        return optional.orElseThrow(exceptionSupplier);
    }
}

