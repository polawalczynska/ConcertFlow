package com.concertflow.api.artist.entity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByNameContainingIgnoreCase(String trim);

    boolean existsByName(String name);

    List<Artist> findByCoordinatorId(Long coordinatorId, Pageable pageable);

    List<Artist> findByCoordinatorId(Long coordinatorId);

    List<Artist> findByCoordinatorIdAndNameContainingIgnoreCase(Long coordinatorId, String name);

    boolean existsByIdAndCoordinatorId(Long id, Long coordinatorId);

    boolean existsByCoordinatorIdAndName(Long coordinatorId, String name);
}
