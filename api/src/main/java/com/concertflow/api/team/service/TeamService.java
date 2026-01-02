package com.concertflow.api.team.service;

import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.dto.InviteTeamMemberRequest;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {
    private final TeamMemberService teamMemberService;
    private final TeamInvitationService teamInvitationService;
    private final AssignedConcertsService assignedConcertsService;

    public List<TeamMemberResponse> getTeamMembers(Long coordinatorId) {
        return teamMemberService.getTeamMembers(coordinatorId);
    }

    public List<TeamMemberResponse> getTeamMembersForManager(User manager) {
        return teamMemberService.getTeamMembersForManager(manager.getId());
    }

    public TeamMemberResponse getTeamMember(Long memberId) {
        return teamMemberService.getTeamMember(memberId);
    }

    public void removeTeamMember(Long memberId, User coordinator) {
        teamMemberService.removeTeamMember(memberId, coordinator.getId());
    }

    public List<TeamInvitationResponse> getPendingInvitations(Long coordinatorId) {
        return teamInvitationService.getPendingInvitations(coordinatorId);
    }

    public TeamInvitationResponse inviteTeamMember(InviteTeamMemberRequest request, User coordinator) {
        return teamInvitationService.inviteTeamMember(request, coordinator);
    }

    public TeamInvitationResponse getInvitation(Long invitationId, User user) {
        return teamInvitationService.getInvitation(invitationId, user);
    }

    public TeamInvitationResponse acceptInvitation(Long invitationId, User user) {
        return teamInvitationService.acceptInvitation(invitationId, user);
    }

    public TeamInvitationResponse rejectInvitation(Long invitationId, User user) {
        return teamInvitationService.rejectInvitation(invitationId, user);
    }

    @Transactional(readOnly = true)
    public List<ConcertResponse> getAssignedConcerts(Long userId) {
        return assignedConcertsService.getAssignedConcerts(userId);
    }

    @Transactional(readOnly = true)
    public boolean isTeamMember(Long userId, Long coordinatorId) {
        return teamMemberService.isTeamMember(userId, coordinatorId);
    }

    @Transactional(readOnly = true)
    public boolean hasAcceptedInvitation(Long userId) {
        return teamMemberService.hasAcceptedInvitation(userId);
    }

    @Transactional(readOnly = true)
    public boolean isOnAnotherTeam(Long userId, Long coordinatorId) {
        return teamMemberService.isOnAnotherTeam(userId, coordinatorId);
    }

    @Transactional
    public void cancelInvitation(Long invitationId, User coordinator) {
        teamInvitationService.cancelInvitation(invitationId, coordinator);
    }
}
