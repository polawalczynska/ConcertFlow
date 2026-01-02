package com.concertflow.api.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamInvitationResponse {
    private Long id;
    private String email;
    private String role;
    private String status;
    private LocalDateTime invitedAt;
    private String invitedBy;
}

