package com.concertflow.api.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberResponse {
    private Long id;
    private String name;
    private String role;
    private String email;
    private String phone;
    private String status;
    private Integer assignedConcerts;
}

