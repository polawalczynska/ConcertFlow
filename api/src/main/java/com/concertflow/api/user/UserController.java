package com.concertflow.api.user;

import com.concertflow.api.user.dto.UserResponse;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return userService.getUserResponse(user);
    }

    @GetMapping("/budget-managers")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public List<UserResponse> getBudgetManagers() {
        return userService.getBudgetManagers();
    }
}


