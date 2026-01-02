package com.concertflow.api.concert.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ConcertRepository extends JpaRepository<Concert, Long> {
    List<Concert> findByArtistId(Long id);

    Page<Concert> findAll(Pageable pageable);

    @Query(value = "SELECT c.* FROM concerts c WHERE " +
        "(:status IS NULL OR c.status = CAST(:status AS text)) AND " +
        "(:artistId IS NULL OR c.artist_id = :artistId) AND " +
        "(:coordinatorId IS NULL OR c.coordinator_id = :coordinatorId) AND " +
        "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', CAST(:search AS text), '%'))) " +
        "ORDER BY c.date ASC",
        countQuery = "SELECT COUNT(*) FROM concerts c WHERE " +
        "(:status IS NULL OR c.status = CAST(:status AS text)) AND " +
        "(:artistId IS NULL OR c.artist_id = :artistId) AND " +
        "(:coordinatorId IS NULL OR c.coordinator_id = :coordinatorId) AND " +
        "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', CAST(:search AS text), '%')))",
        nativeQuery = true)
    Page<Concert> findWithFilters(
        @Param("status") String status,
        @Param("artistId") Long artistId,
        @Param("coordinatorId") Long coordinatorId,
        @Param("search") String search,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.date >= :startDate AND c.date <= :endDate")
    Page<Concert> findByDateRange(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.date < :currentDate AND c.status = com.concertflow.api.concert.entity.ConcertStatus.APPROVED")
    List<Concert> findConcertsToComplete(@Param("currentDate") LocalDateTime currentDate);

    @Query("SELECT c FROM Concert c WHERE c.date < :currentDate AND c.status = com.concertflow.api.concert.entity.ConcertStatus.PLANNING")
    List<Concert> findUnapprovedPastConcerts(@Param("currentDate") LocalDateTime currentDate);

    Optional<Concert> findById(Long id);

    Page<Concert> findByBudgetStatusAndStatus(BudgetStatus budgetStatus, ConcertStatus status, Pageable pageable);

    Page<Concert> findByBudgetStatusAndStatusAndBudgetManagerId(
        BudgetStatus budgetStatus, 
        ConcertStatus status, 
        Long budgetManagerId,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.status = :status AND c.budgetManager.id = :budgetManagerId")
    Page<Concert> findByStatusAndBudgetManagerId(
        @Param("status") ConcertStatus status,
        @Param("budgetManagerId") Long budgetManagerId,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.status = :status AND c.technicalManager.id = :technicalManagerId")
    Page<Concert> findByStatusAndTechnicalManagerId(
        @Param("status") ConcertStatus status,
        @Param("technicalManagerId") Long technicalManagerId,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.technicalManager.id = :technicalManagerId")
    Page<Concert> findByTechnicalManagerId(
        @Param("technicalManagerId") Long technicalManagerId,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.technicalStatus = :technicalStatus AND c.status = :status")
    Page<Concert> findByTechnicalStatusAndStatus(
        @Param("technicalStatus") TechnicalStatus technicalStatus,
        @Param("status") ConcertStatus status,
        Pageable pageable
    );

    @Query("SELECT c FROM Concert c WHERE c.technicalStatus = :technicalStatus AND c.status = :status AND c.technicalManager.id = :technicalManagerId")
    Page<Concert> findByTechnicalStatusAndStatusAndTechnicalManagerId(
        @Param("technicalStatus") TechnicalStatus technicalStatus,
        @Param("status") ConcertStatus status,
        @Param("technicalManagerId") Long technicalManagerId,
        Pageable pageable
    );

    List<Concert> findByCoordinatorId(Long coordinatorId);

    @Query("SELECT c FROM Concert c WHERE c.budgetManager.id = :budgetManagerId")
    List<Concert> findByBudgetManagerId(@Param("budgetManagerId") Long budgetManagerId);

    @Query("SELECT c FROM Concert c WHERE c.technicalManager.id = :technicalManagerId")
    List<Concert> findByTechnicalManagerId(@Param("technicalManagerId") Long technicalManagerId);
}
