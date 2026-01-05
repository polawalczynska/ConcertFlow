package com.concertflow.api.concert.service;

import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.team.service.TeamMemberService;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeamMemberValidator {
    private final TeamMemberService teamMemberService;

    public void validateBudgetManagerIsTeamMember(User budgetManager, User coordinator) {
        if (budgetManager != null && !teamMemberService.isTeamMember(budgetManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Budget manager must be a member of your team");
        }
    }

    public void validateTechnicalManagerIsTeamMember(User technicalManager, User coordinator) {
        if (technicalManager != null && !teamMemberService.isTeamMember(technicalManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Technical manager must be a member of your team");
        }
    }

    public void validateManagersAreTeamMembers(User budgetManager, User technicalManager, User coordinator) {
        validateBudgetManagerIsTeamMember(budgetManager, coordinator);
        validateTechnicalManagerIsTeamMember(technicalManager, coordinator);
    }
}

