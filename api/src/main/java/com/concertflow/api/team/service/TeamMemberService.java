package com.concertflow.api.team.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.entity.InvitationStatus;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.team.entity.TeamInvitationRepository;
import com.concertflow.api.team.mapper.TeamMapper;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamMemberService {
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;
    private final ConcertAssignmentCounter concertAssignmentCounter;
    private final TeamInvitationRepository teamInvitationRepository;

    public List<TeamMemberResponse> getTeamMembers(Long coordinatorId) {
        List<TeamInvitation> acceptedInvitations = teamInvitationRepository
                .findByInvitedBy_IdAndStatusOrderByInvitedAtDesc(coordinatorId, InvitationStatus.ACCEPTED);
        
        Set<Long> teamMemberIds = acceptedInvitations.stream()
                .map(invitation -> invitation.getInvitedUser().getId())
                .collect(Collectors.toSet());
        
        List<User> teamMembers = userRepository.findAllById(teamMemberIds).stream()
                .filter(User::getActive)
                .collect(Collectors.toList());

        return teamMembers.stream()
                .map(user -> {
                    Integer assignedConcerts = concertAssignmentCounter.countAssignedConcerts(user);
                    return teamMapper.toTeamMemberResponse(user, assignedConcerts);
                })
                .collect(Collectors.toList());
    }
    
    public boolean isTeamMember(Long userId, Long coordinatorId) {
        List<TeamInvitation> acceptedInvitations = teamInvitationRepository
                .findByInvitedUser_IdAndStatus(userId, InvitationStatus.ACCEPTED);
        return acceptedInvitations.stream()
                .anyMatch(invitation -> invitation.getInvitedBy().getId().equals(coordinatorId));
    }

    public boolean hasAcceptedInvitation(Long userId) {
        return teamInvitationRepository.existsByInvitedUser_IdAndStatus(userId, InvitationStatus.ACCEPTED);
    }

    public TeamMemberResponse getTeamMember(Long memberId) {
        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        Integer assignedConcerts = concertAssignmentCounter.countAssignedConcerts(user);
        return teamMapper.toTeamMemberResponse(user, assignedConcerts);
    }

    @Transactional
    public void removeTeamMember(Long memberId) {
        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        log.info("Removing team member: {}", user.getEmail());
    }
}

