package com.concertflow.api.concert.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicalRequirementsRepository extends JpaRepository<TechnicalRequirements, Long> {
    Optional<TechnicalRequirements> findByConcertId(Long concertId);
}

