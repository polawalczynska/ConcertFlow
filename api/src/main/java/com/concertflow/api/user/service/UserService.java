package com.concertflow.api.user.service;

import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapperService mapperService;
    private final UserQueryService queryService;
    private final UserSearchService searchService;

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
}

