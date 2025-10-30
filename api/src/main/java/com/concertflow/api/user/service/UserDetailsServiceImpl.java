package com.concertflow.api.user.service;

import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      User user = userRepository.findByEmail(email)
          .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

      if(!user.getActive()) {
          throw new UsernameNotFoundException("User is inactive");
      }

      return org.springframework.security.core.userdetails.User.builder()
          .username(user.getEmail())
          .password(user.getPassword())
          .authorities("ROLE_" + user.getRole().name())
          .build();
    }
}
