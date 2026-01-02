package com.concertflow.api.team.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.team.dto.TeamMemberResponse;
import com.concertflow.api.team.mapper.TeamMapper;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamMemberService {
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;
    private final ConcertAssignmentCounter concertAssignmentCounter;

    public List<TeamMemberResponse> getTeamMembers(Long coordinatorId) {
        List<User> allUsers = userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(coordinatorId) && user.getActive())
                .collect(Collectors.toList());

        return allUsers.stream()
                .map(user -> {
                    Integer assignedConcerts = concertAssignmentCounter.countAssignedConcerts(user);
                    return teamMapper.toTeamMemberResponse(user, assignedConcerts);
                })
                .collect(Collectors.toList());
    }

    public TeamMemberResponse getTeamMember(Long memberId) {
        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        Integer assignedConcerts = concertAssignmentCounter.countAssignedConcerts(user);
        return teamMapper.toTeamMemberResponse(user, assignedConcerts);
    }

    @Transactional
    public void removeTeamMember(Long memberId) {
        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        log.info("Removing team member: {}", user.getEmail());
    }
}

