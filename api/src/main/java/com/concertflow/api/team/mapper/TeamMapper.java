package com.concertflow.api.team.mapper;

import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class TeamMapper {
    public TeamMemberResponse toTeamMemberResponse(User user, Integer assignedConcerts) {
        return TeamMemberResponse.builder()
                .id(user.getId())
                .name(user.getFirstName() + " " + user.getLastName())
                .role(user.getRole().name())
                .email(user.getEmail())
                .phone(user.getPhone())
                .status(user.getActive() ? "active" : "inactive")
                .assignedConcerts(assignedConcerts != null ? assignedConcerts : 0)
                .build();
    }

    public TeamInvitationResponse toTeamInvitationResponse(TeamInvitation invitation) {
        return TeamInvitationResponse.builder()
                .id(invitation.getId())
                .email(invitation.getInvitedUser().getEmail())
                .role(invitation.getInvitedUser().getRole().name())
                .status(invitation.getStatus().name())
                .invitedAt(invitation.getInvitedAt())
                .invitedBy(invitation.getInvitedBy().getFirstName() + " " + invitation.getInvitedBy().getLastName())
                .build();
    }
}

