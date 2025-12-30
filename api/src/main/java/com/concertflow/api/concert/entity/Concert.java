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

    @Column(nullable = false)
    private String city;

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

    @ManyToOne
    @JoinColumn(name = "budget_manager_id")
    private User budgetManager;

    @ManyToOne
    @JoinColumn(name = "technical_manager_id")
    private User technicalManager;

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Approval> approvals = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private BudgetStatus budgetStatus = BudgetStatus.PENDING;

    private BigDecimal estimatedBudget;

    private BigDecimal approvedBudget;

    private BigDecimal submittedBudget;

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<BudgetItem> budgetItems = new ArrayList<>();

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL)
    @Builder.Default
    private List<BudgetApproval> budgetApprovals = new ArrayList<>();

    @OneToOne(mappedBy = "concert", cascade = CascadeType.ALL, orphanRemoval = true)
    private TechnicalRequirements technicalRequirements;

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TechnicalApproval> technicalApprovals = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "technical_status")
    @Builder.Default
    private TechnicalStatus technicalStatus = TechnicalStatus.PENDING;

    private BigDecimal actualExpenses;

    @Column(length = 1000)
    private String budgetRejectionReason;

    private LocalDateTime budgetApprovedAt;

    private Long budgetApprovedById;

    @Column(nullable = false)
    @Builder.Default
    private Integer budgetVersion = 1;
}
