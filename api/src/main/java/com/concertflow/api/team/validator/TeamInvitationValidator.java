package com.concertflow.api.team.validator;

import com.concertflow.api.exceptions.types.AlreadyTeamMemberException;
import com.concertflow.api.exceptions.types.InvalidInvitationStatusException;
import com.concertflow.api.exceptions.types.PendingInvitationExistsException;
import com.concertflow.api.team.entity.InvitationStatus;
import com.concertflow.api.team.entity.TeamInvitationRepository;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TeamInvitationValidator {
    private final TeamInvitationRepository teamInvitationRepository;

    public void validateNoPendingInvitation(User invitedUser) {
        if (teamInvitationRepository.existsByInvitedUser_IdAndStatus(
                invitedUser.getId(), InvitationStatus.PENDING)) {
            throw new PendingInvitationExistsException("User already has a pending invitation");
        }
    }

    public void validateNotAlreadyTeamMember(User invitedUser) {
        if (teamInvitationRepository.existsByInvitedUser_IdAndStatus(
                invitedUser.getId(), InvitationStatus.ACCEPTED)) {
            throw new AlreadyTeamMemberException("User is already a member of a team");
        }
    }

    public void validateNotAlreadyOnTeam(User invitedUser, User coordinator) {
        if (invitedUser.getId().equals(coordinator.getId())) {
            throw new AlreadyTeamMemberException("You cannot invite yourself to your team");
        }
        
        List<com.concertflow.api.team.entity.TeamInvitation> acceptedInvitations = 
            teamInvitationRepository.findByInvitedUser_IdAndStatus(invitedUser.getId(), InvitationStatus.ACCEPTED);
        
        boolean isAlreadyOnTeam = acceptedInvitations.stream()
            .anyMatch(invitation -> invitation.getInvitedBy().getId().equals(coordinator.getId()));
        
        if (isAlreadyOnTeam) {
            throw new AlreadyTeamMemberException("User is already a member of your team");
        }
    }

    public void validateInvitationIsPending(InvitationStatus status) {
        if (status != InvitationStatus.PENDING) {
            throw new InvalidInvitationStatusException("Invitation is not pending");
        }
    }

    public void validateCoordinatorOwnership(com.concertflow.api.team.entity.TeamInvitation invitation, com.concertflow.api.user.entity.User coordinator) {
        if (!invitation.getInvitedBy().getId().equals(coordinator.getId())) {
            throw new com.concertflow.api.exceptions.types.UnauthorizedAccessException(
                "You can only cancel invitations that you sent");
        }
    }
}

