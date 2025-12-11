package com.concertflow.api.user.service;

import com.concertflow.api.exceptions.types.UserDisabledException;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.USER_DISABLED;
import static com.concertflow.api.exceptions.ErrorMessage.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserDetails implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND.message()));

        if (!user.getActive()) {
            throw new UserDisabledException(USER_DISABLED.message());
        }

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .authorities("ROLE_" + user.getRole().name())
            .build();
    }
}
