package com.concertflow.api.notification.entity;

import com.concertflow.api.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications", indexes = {
    @Index(name = "idx_notification_user_id", columnList = "user_id"),
    @Index(name = "idx_notification_user_read", columnList = "user_id,read"),
    @Index(name = "idx_notification_user_created", columnList = "user_id,created_at"),
    @Index(name = "idx_notification_user_read_created", columnList = "user_id,read,created_at"),
    @Index(name = "idx_notification_invitation_id", columnList = "invitation_id"),
    @Index(name = "idx_notification_concert_id", columnList = "concert_id"),
    @Index(name = "idx_notification_type", columnList = "type")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Boolean read = false;

    @Column(name = "concert_id")
    private Long concertId;

    @Column(name = "invitation_id")
    private Long invitationId;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

