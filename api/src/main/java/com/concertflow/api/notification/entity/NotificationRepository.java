package com.concertflow.api.notification.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_IdOrderByCreatedAtDesc(Long userId);
    
    List<Notification> findByUser_IdAndReadOrderByCreatedAtDesc(Long userId, Boolean read);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.id = :userId AND n.read = false")
    Long countUnreadByUser_Id(@Param("userId") Long userId);
    
    @Modifying
    @Query("UPDATE Notification n SET n.read = true WHERE n.user.id = :userId AND n.read = false")
    int markAllAsReadByUser_Id(@Param("userId") Long userId);
    
    @Modifying
    @Query("UPDATE Notification n SET n.read = true WHERE n.id = :id AND n.user.id = :userId")
    int markAsReadByIdAndUser_Id(@Param("id") Long id, @Param("userId") Long userId);
}

