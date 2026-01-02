package com.concertflow.api.team.mapper;

import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.user.adapter.RoleAdapterInterface;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeamMapper {
    private final RoleAdapterInterface roleAdapter;

    public TeamMemberResponse toTeamMemberResponse(User user, Integer assignedConcerts) {
        return TeamMemberResponse.builder()
                .id(user.getId())
                .name(user.getFirstName() + " " + user.getLastName())
                .role(roleAdapter.adapt(user.getRole()))
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
                .role(roleAdapter.adapt(invitation.getInvitedUser().getRole()))
                .status(invitation.getStatus().name())
                .invitedAt(invitation.getInvitedAt())
                .invitedBy(invitation.getInvitedBy().getFirstName() + " " + invitation.getInvitedBy().getLastName())
                .build();
    }
}

