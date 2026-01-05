package com.concertflow.api.team.entity;

import com.concertflow.api.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "team_invitations", indexes = {
    @Index(name = "idx_team_invitation_invited_user_id", columnList = "invited_user_id"),
    @Index(name = "idx_team_invitation_invited_by_id", columnList = "invited_by_id"),
    @Index(name = "idx_team_invitation_invited_user_status", columnList = "invited_user_id,status"),
    @Index(name = "idx_team_invitation_invited_by_status", columnList = "invited_by_id,status"),
    @Index(name = "idx_team_invitation_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamInvitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invited_user_id", nullable = false)
    private User invitedUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invited_by_id", nullable = false)
    private User invitedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private InvitationStatus status = InvitationStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime invitedAt;

    private LocalDateTime respondedAt;

    @PrePersist
    protected void onCreate() {
        if (invitedAt == null) {
            invitedAt = LocalDateTime.now();
        }
    }
}

