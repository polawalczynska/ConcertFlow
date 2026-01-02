package com.concertflow.api.team.service;

import com.concertflow.api.exceptions.types.InvalidInvitationStatusException;
import com.concertflow.api.exceptions.types.TeamInvitationNotFoundException;
import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.notification.event.TeamInvitationCreatedEvent;
import com.concertflow.api.team.dto.InviteTeamMemberRequest;
import com.concertflow.api.team.dto.TeamInvitationResponse;
import com.concertflow.api.team.entity.InvitationStatus;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.team.entity.TeamInvitationRepository;
import com.concertflow.api.team.mapper.TeamMapper;
import com.concertflow.api.team.validator.TeamInvitationValidator;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamInvitationService {
    private final TeamInvitationRepository teamInvitationRepository;
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;
    private final TeamInvitationValidator validator;
    private final ApplicationEventPublisher eventPublisher;

    public List<TeamInvitationResponse> getPendingInvitations(Long coordinatorId) {
        List<TeamInvitation> invitations = teamInvitationRepository
                .findByInvitedBy_IdAndStatus(coordinatorId, InvitationStatus.PENDING);
        
        return invitations.stream()
                .map(teamMapper::toTeamInvitationResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TeamInvitationResponse inviteTeamMember(InviteTeamMemberRequest request, User coordinator) {
        User invitedUser = findUserByEmail(request.getEmail());
        validator.validateNoPendingInvitation(invitedUser);

        TeamInvitation invitation = createInvitation(invitedUser, coordinator);
        invitation = teamInvitationRepository.save(invitation);
        
        eventPublisher.publishEvent(new TeamInvitationCreatedEvent(invitation));
        
        log.info("Team invitation created: {} invited by {}", invitedUser.getEmail(), coordinator.getEmail());
        return teamMapper.toTeamInvitationResponse(invitation);
    }

    public TeamInvitationResponse getInvitation(Long invitationId, User user) {
        TeamInvitation invitation = findInvitationByIdAndUser(invitationId, user.getId());
        return teamMapper.toTeamInvitationResponse(invitation);
    }

    @Transactional
    public TeamInvitationResponse acceptInvitation(Long invitationId, User user) {
        TeamInvitation invitation = findInvitationByIdAndUser(invitationId, user.getId());
        validator.validateInvitationIsPending(invitation.getStatus());

        updateInvitationStatus(invitation, InvitationStatus.ACCEPTED);
        invitation = teamInvitationRepository.save(invitation);

        log.info("Team invitation accepted: {} by {}", invitation.getInvitedUser().getEmail(), user.getEmail());
        return teamMapper.toTeamInvitationResponse(invitation);
    }

    @Transactional
    public TeamInvitationResponse rejectInvitation(Long invitationId, User user) {
        TeamInvitation invitation = findInvitationByIdAndUser(invitationId, user.getId());
        validator.validateInvitationIsPending(invitation.getStatus());

        updateInvitationStatus(invitation, InvitationStatus.REJECTED);
        invitation = teamInvitationRepository.save(invitation);

        log.info("Team invitation rejected: {} by {}", invitation.getInvitedUser().getEmail(), user.getEmail());
        return teamMapper.toTeamInvitationResponse(invitation);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    private TeamInvitation findInvitationByIdAndUser(Long invitationId, Long userId) {
        return teamInvitationRepository
                .findByIdAndInvitedUser_Id(invitationId, userId)
                .orElseThrow(() -> new TeamInvitationNotFoundException("Invitation not found"));
    }

    private TeamInvitation createInvitation(User invitedUser, User coordinator) {
        return TeamInvitation.builder()
                .invitedUser(invitedUser)
                .invitedBy(coordinator)
                .status(InvitationStatus.PENDING)
                .invitedAt(LocalDateTime.now())
                .build();
    }

    private void updateInvitationStatus(TeamInvitation invitation, InvitationStatus status) {
        invitation.setStatus(status);
        invitation.setRespondedAt(LocalDateTime.now());
    }
}

