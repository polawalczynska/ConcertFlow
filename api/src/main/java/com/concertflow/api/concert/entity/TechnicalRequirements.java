package com.concertflow.api.concert.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "technical_requirements", indexes = {
    @Index(name = "idx_technical_requirements_concert_id", columnList = "concert_id"),
    @Index(name = "idx_technical_requirements_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicalRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concert_id", nullable = false, unique = true)
    private Concert concert;

    @Column(name = "power_requirements")
    private BigDecimal powerRequirements;

    @Column(name = "technical_requirements", length = 2000)
    private String technicalRequirements;

    @Column(name = "technical_flags", length = 500)
    private String technicalFlags;

    @Column(name = "audio_requirements", columnDefinition = "TEXT")
    private String audioRequirements;

    @Column(name = "lighting_requirements", columnDefinition = "TEXT")
    private String lightingRequirements;

    @Column(name = "safety_requirements", columnDefinition = "TEXT")
    private String safetyRequirements;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private TechnicalStatus status = TechnicalStatus.PENDING;

    @Column(name = "submitted_at")
    private java.time.LocalDateTime submittedAt;

    @Column(name = "approved_at")
    private java.time.LocalDateTime approvedAt;

    @Column(name = "approved_by_id")
    private Long approvedById;

    @Column(name = "version", nullable = false)
    @Builder.Default
    private Integer version = 1;
}

