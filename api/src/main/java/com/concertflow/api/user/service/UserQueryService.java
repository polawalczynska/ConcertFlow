package com.concertflow.api.user.service;

import com.concertflow.api.team.entity.InvitationStatus;
import com.concertflow.api.team.entity.TeamInvitationRepository;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.UserRepository;
import com.concertflow.api.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserQueryService {
    private final UserRepository userRepository;
    private final TeamInvitationRepository teamInvitationRepository;

    public List<UserResponse> getUsersByRole(Role role) {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == role && user.getActive())
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    public List<UserResponse> getBudgetManagers() {
        return getUsersByRole(Role.BUDGET_MANAGER);
    }

    public List<UserResponse> getTechnicalManagers() {
        return getUsersByRole(Role.TECHNICAL_MANAGER);
    }

    public List<UserResponse> getBudgetManagersByTeam(Long coordinatorId) {
        Set<Long> teamMemberIds = getTeamMemberIds(coordinatorId);
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == Role.BUDGET_MANAGER 
                && user.getActive() 
                && teamMemberIds.contains(user.getId()))
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    public List<UserResponse> getTechnicalManagersByTeam(Long coordinatorId) {
        Set<Long> teamMemberIds = getTeamMemberIds(coordinatorId);
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == Role.TECHNICAL_MANAGER 
                && user.getActive() 
                && teamMemberIds.contains(user.getId()))
            .map(UserResponse::fromUser)
            .collect(Collectors.toList());
    }

    private Set<Long> getTeamMemberIds(Long coordinatorId) {
        Set<Long> teamMemberIds = teamInvitationRepository
            .findByInvitedBy_IdAndStatus(coordinatorId, InvitationStatus.ACCEPTED)
            .stream()
            .map(invitation -> invitation.getInvitedUser().getId())
            .collect(Collectors.toSet());
        teamMemberIds.add(coordinatorId);
        return teamMemberIds;
    }
}

