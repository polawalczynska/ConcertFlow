package com.concertflow.api.concert.entity;

import com.concertflow.api.approval.entity.Approval;
import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "concerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Concert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private String venue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ConcertStatus status = ConcertStatus.PLANNING;

    @Column(nullable = false)
    private BigDecimal budget;

    private String description;

    private String cancellationReason;

    @ManyToOne
    @JoinColumn(name = "coordinator_id", nullable = false)
    private User coordinator;

    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Approval> approvals = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
