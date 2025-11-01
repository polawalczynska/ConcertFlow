package com.concertflow.api.jwt.interceptor;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.service.AuthService;
import com.concertflow.api.exceptions.types.TokenRefreshException;
import com.concertflow.api.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

@Component
@RequiredArgsConstructor
public class TokenRefreshInterceptor implements HandlerInterceptor {
    private final AuthService authService;
    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return true;
        }

        String accessToken = authHeader.substring("Bearer ".length());

        if (!jwtService.validateToken(accessToken)) {
            String refreshToken = request.getHeader("X-Refresh-Token");
            if (refreshToken != null && jwtService.validateToken(refreshToken)) {
                try {
                    AuthResponse newTokens = authService.refreshToken(refreshToken);
                    response.setHeader("New-Access-Token", newTokens.accessToken());
                    response.setHeader("New-Refresh-Token", newTokens.refreshToken());
                } catch (TokenRefreshException e) {
                    response.setStatus(SC_UNAUTHORIZED);
                    return false;
                }
            }
        }
        return true;
    }
}

