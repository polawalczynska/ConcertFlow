package com.concertflow.api.artist.entity;

import com.concertflow.api.concert.entity.Concert;
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
    @Index(name = "idx_artist_name", columnList = "name")
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

    @OneToMany(mappedBy = "artist")
    @Builder.Default
    private List<Concert> concerts = new ArrayList<>();
}
