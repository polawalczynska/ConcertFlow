package com.concertflow.api.artist.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByNameContainingIgnoreCase(String trim);

    boolean existsByName(String name);
}
