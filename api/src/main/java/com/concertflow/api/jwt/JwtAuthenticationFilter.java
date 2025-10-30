package com.concertflow.api.jwt;

import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.PathContainer;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import static com.concertflow.api.exceptions.ErrorMessage.*;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final List<String> PERMIT_ALL_ENDPOINTS = List.of(
        "/api/auth/**",
        "/api/api-docs/**",
        "/swagger-ui/**"
    );

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final List<PathPattern> permitAllPatterns = PERMIT_ALL_ENDPOINTS.stream()
        .map(PathPatternParser.defaultInstance::parse)
        .toList();

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            PathContainer path = PathContainer.parsePath(request.getRequestURI());
            if (permitAllPatterns.stream().anyMatch(pattern -> pattern.matches(path))) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = getTokenFromRequest(request);

            if (token != null && jwtService.validateToken(token)) {
                String email = jwtService.getEmailFromToken(token);

                User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND.message()));

                if (user.getActive()) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, getAuthorities(user));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    logger.warn(USER_DISABLED.message());
                }
            }
        } catch (Exception e) {
            logger.error(INVALID_CREDENTIALS.message(), e);
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }
}
