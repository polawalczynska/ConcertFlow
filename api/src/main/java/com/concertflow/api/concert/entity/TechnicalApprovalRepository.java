package com.concertflow.api.concert.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnicalApprovalRepository extends JpaRepository<TechnicalApproval, Long> {
    List<TechnicalApproval> findByConcertId(Long concertId);
}

