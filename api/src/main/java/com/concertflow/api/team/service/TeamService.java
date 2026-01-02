package com.concertflow.api.team.service;

import com.concertflow.api.team.dto.InviteTeamMemberRequest;
import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamMemberService teamMemberService;
    private final TeamInvitationService teamInvitationService;

    public List<TeamMemberResponse> getTeamMembers(Long coordinatorId) {
        return teamMemberService.getTeamMembers(coordinatorId);
    }

    public TeamMemberResponse getTeamMember(Long memberId) {
        return teamMemberService.getTeamMember(memberId);
    }

    public void removeTeamMember(Long memberId) {
        teamMemberService.removeTeamMember(memberId);
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
}

