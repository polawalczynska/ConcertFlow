package com.concertflow.api.user.service;

import com.concertflow.api.exceptions.types.UserNotFoundException;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class UserFinder {
    private final UserRepository userRepository;

    public User findByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    public User findByEmailOrThrow(String email, Supplier<String> errorMessage) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException(errorMessage.get()));
    }

    /**
     * Finds a user by email or throws UsernameNotFoundException (for Spring Security compatibility).
     *
     * @param email User email
     * @param errorMessage Custom error message
     * @return User entity
     * @throws UsernameNotFoundException if user not found
     */
    public User findByEmailOrThrowUsernameNotFound(String email, String errorMessage) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(errorMessage));
    }

    public User findByIdAndRoleOrThrow(Long id, Role role, String roleName) {
        return userRepository.findById(id)
            .filter(user -> user.getRole() == role && user.getActive())
            .orElseThrow(() -> new UserNotFoundException(
                String.format("%s not found or inactive with ID: %d", roleName, id)
            ));
    }

    public User findByIdOrThrow(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
    }
}

