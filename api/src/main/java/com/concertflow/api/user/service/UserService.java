package com.concertflow.api.user.service;

import com.concertflow.api.approval.entity.ApprovalRepository;
import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.exceptions.types.InvalidCredentialsException;
import com.concertflow.api.notification.entity.NotificationRepository;
import com.concertflow.api.team.entity.TeamInvitation;
import com.concertflow.api.team.entity.TeamInvitationRepository;
import com.concertflow.api.user.dto.UpdateUserRequest;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.concertflow.api.exceptions.ErrorMessage.EMAIL_EXISTS;
import static com.concertflow.api.exceptions.ErrorMessage.INVALID_CREDENTIALS;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapperService mapperService;
    private final UserQueryService queryService;
    private final UserSearchService searchService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConcertRepository concertRepository;
    private final TeamInvitationRepository teamInvitationRepository;
    private final NotificationRepository notificationRepository;
    private final ArtistRepository artistRepository;
    private final ApprovalRepository approvalRepository;

    public UserResponse getUserResponse(User user) {
        return mapperService.toUserResponse(user);
    }

    public List<UserResponse> getBudgetManagers() {
        return queryService.getBudgetManagers();
    }

    public List<UserResponse> getTechnicalManagers() {
        return queryService.getTechnicalManagers();
    }

    public List<UserResponse> getBudgetManagersByTeam(Long coordinatorId) {
        return queryService.getBudgetManagersByTeam(coordinatorId);
    }

    public List<UserResponse> getTechnicalManagersByTeam(Long coordinatorId) {
        return queryService.getTechnicalManagersByTeam(coordinatorId);
    }

    public UserResponse getUserByEmail(String email) {
        return searchService.getUserByEmail(email);
    }

    @Transactional
    public UserResponse updateUser(User user, UpdateUserRequest request) {
        if (!user.getEmail().equals(request.email())) {
            if (userRepository.existsByEmail(request.email())) {
                throw new EmailAlreadyExistsException(EMAIL_EXISTS.message());
            }
        }

        if (request.newPassword() != null && !request.newPassword().isEmpty()) {
            if (request.currentPassword() == null || request.currentPassword().isEmpty()) {
                throw new InvalidCredentialsException("Current password is required when changing password");
            }
            if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
                throw new InvalidCredentialsException(INVALID_CREDENTIALS.message());
            }
            if (!request.newPassword().equals(request.confirmPassword())) {
                throw new IllegalArgumentException("New password and confirm password do not match");
            }
            user.setPassword(passwordEncoder.encode(request.newPassword()));
        }

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setRole(request.role());

        userRepository.save(user);

        return mapperService.toUserResponse(user);
    }

    @Transactional
    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void deleteAccount(User user) {
        Long userId = user.getId();
        
        if (user.getRole() == Role.COORDINATOR) {
            List<Concert> concerts = concertRepository.findByCoordinatorId(userId);
            
            // Delete all notifications related to these concerts
            for (Concert concert : concerts) {
                notificationRepository.deleteByConcertId(concert.getId());
            }
            
            concertRepository.deleteAll(concerts);
            concertRepository.flush();

            // Delete all artists created by this coordinator
            List<Artist> artists = artistRepository.findByCoordinatorId(userId);
            artistRepository.deleteAll(artists);
            artistRepository.flush();

            // Delete team invitations where user is the inviter
            List<TeamInvitation> invitationsByUser = teamInvitationRepository.findByInvitedBy_Id(userId);
            teamInvitationRepository.deleteAll(invitationsByUser);
            teamInvitationRepository.flush();
        } else {
            // For managers, unassign them from concerts
            List<Concert> concertsAsBudgetManager = concertRepository.findByBudgetManagerId(userId);
            for (Concert concert : concertsAsBudgetManager) {
                concert.setBudgetManager(null);
            }
            
            List<Concert> concertsAsTechnicalManager = concertRepository.findByTechnicalManagerId(userId);
            for (Concert concert : concertsAsTechnicalManager) {
                concert.setTechnicalManager(null);
            }
            
            concertRepository.saveAll(concertsAsBudgetManager);
            concertRepository.saveAll(concertsAsTechnicalManager);
            concertRepository.flush();
        }
        
        // Delete all notifications for this user
        notificationRepository.deleteByUserId(userId);
        notificationRepository.flush();
        
        // Delete team invitations where user is the invited user
        List<TeamInvitation> invitationsForUser = teamInvitationRepository.findByInvitedUser_Id(userId);
        if (!invitationsForUser.isEmpty()) {
            teamInvitationRepository.deleteAll(invitationsForUser);
            teamInvitationRepository.flush();
        }
        
        // Nullify approvals where user is the approver (set approver to null)
        approvalRepository.nullifyApproverByApproverId(userId);
        approvalRepository.flush();
        
        // Finally, delete the user
        userRepository.delete(user);
        userRepository.flush();
    }
}

