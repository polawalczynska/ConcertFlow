package com.concertflow.api.user;

import com.concertflow.api.security.annotation.RequireAuthenticated;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.user.dto.UpdateUserRequest;
import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/me")
    @RequireAuthenticated
    @ResponseStatus(HttpStatus.OK)
    public UserResponse updateCurrentUser(
            @Valid @RequestBody UpdateUserRequest request,
            @AuthenticationPrincipal User user
    ) {
        return userService.updateUser(user, request);
    }

    @GetMapping("/budget-managers")
    @RequireCoordinator
    public List<UserResponse> getBudgetManagers(@AuthenticationPrincipal User coordinator) {
        return userService.getBudgetManagersByTeam(coordinator.getId());
    }

    @GetMapping("/technical-managers")
    @RequireCoordinator
    public List<UserResponse> getTechnicalManagers(@AuthenticationPrincipal User coordinator) {
        return userService.getTechnicalManagersByTeam(coordinator.getId());
    }

    @GetMapping("/search")
    @RequireCoordinator
    public UserResponse searchUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @DeleteMapping("/me")
    @RequireAuthenticated
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAccount(@AuthenticationPrincipal User user) {
        userService.deleteAccount(user);
    }
}


