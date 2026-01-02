package com.concertflow.api.notification.event;

import com.concertflow.api.team.entity.TeamInvitation;

public record TeamInvitationCreatedEvent(TeamInvitation invitation) {
}

