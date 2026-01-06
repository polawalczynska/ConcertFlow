package com.concertflow.api.team;

import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.security.annotation.RequireAuthenticated;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.team.dto.InviteTeamMemberRequest;
import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.service.TeamService;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.API_V1_BASE_PATH + "/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/members")
    @RequireAuthenticated
    public List<TeamMemberResponse> getTeamMembers(@AuthenticationPrincipal User user) {
        
        if (user.getRole().name().equals("COORDINATOR")) {
            return teamService.getTeamMembers(user.getId());
        }
        return teamService.getTeamMembersForManager(user);
    }

    @GetMapping("/members/{id}")
    @RequireAuthenticated
    public TeamMemberResponse getTeamMember(@PathVariable Long id) {
        return teamService.getTeamMember(id);
    }

    @GetMapping("/invitations")
    @RequireCoordinator
    public List<TeamInvitationResponse> getPendingInvitations(@AuthenticationPrincipal User coordinator) {
        return teamService.getPendingInvitations(coordinator.getId());
    }

    @PostMapping("/invite")
    @RequireCoordinator
    public ResponseEntity<TeamInvitationResponse> inviteTeamMember(
            @Valid @RequestBody InviteTeamMemberRequest request,
            @AuthenticationPrincipal User coordinator) {
        TeamInvitationResponse response = teamService.inviteTeamMember(request, coordinator);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/members/{id}")
    @RequireCoordinator
    public ResponseEntity<Void> removeTeamMember(
            @PathVariable Long id,
            @AuthenticationPrincipal User coordinator) {
        teamService.removeTeamMember(id, coordinator);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/invitations/{id}")
    @RequireAuthenticated
    public TeamInvitationResponse getInvitation(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return teamService.getInvitation(id, user);
    }

    @PostMapping("/invitations/{id}/accept")
    @RequireAuthenticated
    public ResponseEntity<TeamInvitationResponse> acceptInvitation(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        TeamInvitationResponse response = teamService.acceptInvitation(id, user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/invitations/{id}/reject")
    @RequireAuthenticated
    public ResponseEntity<TeamInvitationResponse> rejectInvitation(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        TeamInvitationResponse response = teamService.rejectInvitation(id, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/invitations/{id}")
    @RequireCoordinator
    public ResponseEntity<Void> cancelInvitation(
            @PathVariable Long id,
            @AuthenticationPrincipal User coordinator) {
        teamService.cancelInvitation(id, coordinator);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members/{id}/concerts")
    @RequireAuthenticated
    public List<ConcertResponse> getAssignedConcerts(@PathVariable Long id) {
        return teamService.getAssignedConcerts(id);
    }

    @GetMapping("/check-membership")
    @RequireAuthenticated
    public ResponseEntity<Boolean> checkTeamMembership(@AuthenticationPrincipal User user) {
        boolean isMember = teamService.hasAcceptedInvitation(user.getId());
        return ResponseEntity.ok(isMember);
    }

    @GetMapping("/check-other-team/{userId}")
    @RequireCoordinator
    public ResponseEntity<Boolean> checkIfUserOnAnotherTeam(
            @PathVariable Long userId,
            @AuthenticationPrincipal User coordinator) {
        boolean isOnAnotherTeam = teamService.isOnAnotherTeam(userId, coordinator.getId());
        return ResponseEntity.ok(isOnAnotherTeam);
    }
}

