package com.concertflow.api.notification;

import com.concertflow.api.notification.dto.NotificationResponse;
import com.concertflow.api.notification.entity.Notification;
import com.concertflow.api.notification.entity.NotificationRepository;
import com.concertflow.api.notification.mapper.NotificationMapper;
import com.concertflow.api.notification.service.NotificationService;
import com.concertflow.api.security.annotation.RequireAuthenticated;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final NotificationService notificationService;

    @GetMapping
    @RequireAuthenticated
    public List<NotificationResponse> getNotifications(@AuthenticationPrincipal User user) {
        List<Notification> notifications = notificationRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());
        return notifications.stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @GetMapping("/unread-count")
    @RequireAuthenticated
    public ResponseEntity<Long> getUnreadCount(@AuthenticationPrincipal User user) {
        Long count = notificationRepository.countUnreadByUser_Id(user.getId());
        return ResponseEntity.ok(count);
    }

    @PostMapping("/{id}/read")
    @RequireAuthenticated
    public ResponseEntity<Void> markAsRead(@PathVariable Long id, @AuthenticationPrincipal User user) {
        notificationService.markAsRead(id, user.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/mark-all-read")
    @RequireAuthenticated
    public ResponseEntity<Void> markAllAsRead(@AuthenticationPrincipal User user) {
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok().build();
    }
}

