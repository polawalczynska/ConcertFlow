package com.concertflow.api.user;

import com.concertflow.api.security.annotation.RequireAuthenticated;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    @RequireAuthenticated
    public UserResponse getCurrentUser(@AuthenticationPrincipal User user) {
        return userService.getUserResponse(user);
    }

    @GetMapping("/budget-managers")
    @PreAuthorize("hasRole('COORDINATOR')")
    public List<UserResponse> getBudgetManagers(@AuthenticationPrincipal User coordinator) {
        return userService.getBudgetManagersByTeam(coordinator.getId());
    }

    @GetMapping("/technical-managers")
    @PreAuthorize("hasRole('COORDINATOR')")
    public List<UserResponse> getTechnicalManagers(@AuthenticationPrincipal User coordinator) {
        return userService.getTechnicalManagersByTeam(coordinator.getId());
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('COORDINATOR')")
    public UserResponse searchUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
}


