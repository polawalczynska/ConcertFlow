package com.concertflow.api.artist.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByNameContainingIgnoreCase(String trim);

    boolean existsByName(String name);
    
    @Query("SELECT COUNT(c) FROM com.concertflow.api.concert.entity.Concert c WHERE c.artist.id = :artistId AND c.date > :currentDate")
    long countByArtistIdAndDateAfter(@Param("artistId") Long artistId, @Param("currentDate") LocalDateTime currentDate);
}
