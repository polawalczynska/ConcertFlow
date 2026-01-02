package com.concertflow.api.team.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamInvitationRepository extends JpaRepository<TeamInvitation, Long> {
    List<TeamInvitation> findByInvitedBy_IdAndStatus(Long coordinatorId, InvitationStatus status);
    
    List<TeamInvitation> findByInvitedUser_IdAndStatus(Long userId, InvitationStatus status);
    
    Optional<TeamInvitation> findByIdAndInvitedUser_Id(Long id, Long userId);
    
    boolean existsByInvitedUser_IdAndStatus(Long userId, InvitationStatus status);
}

