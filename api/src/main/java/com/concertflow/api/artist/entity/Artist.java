package com.concertflow.api.artist.entity;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "artists", indexes = {
    @Index(name = "idx_artist_email", columnList = "email"),
    @Index(name = "idx_artist_name", columnList = "name"),
    @Index(name = "idx_artist_coordinator_id", columnList = "coordinator_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private String genre;
    private String website;
    private String contactPerson;

    @ManyToOne
    @JoinColumn(name = "coordinator_id", nullable = false)
    private User coordinator;

    @OneToMany(mappedBy = "artist")
    @Builder.Default
    private List<Concert> concerts = new ArrayList<>();
}
