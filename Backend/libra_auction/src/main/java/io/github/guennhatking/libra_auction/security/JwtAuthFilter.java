package io.github.guennhatking.libra_auction.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtRSA jwtRSA;
    private final JwtUtils jwtUtils;

    public JwtAuthFilter(JwtRSA jwtRSA, JwtUtils jwtUtils) {
        this.jwtRSA = jwtRSA;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip WebSocket
        String upgrade = request.getHeader("Upgrade");
        String connection = request.getHeader("Connection");
        if ("websocket".equalsIgnoreCase(upgrade) &&
                connection != null &&
                connection.toUpperCase().contains("UPGRADE")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = null;
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                System.out.println("Token from HEADER");
            }

            if (token == null) {
                token = getTokenFromCookie(request);
                if (token != null) {
                    System.out.println("Token from COOKIE");
                }
            }
            System.out.println("Token: " + token);
            System.out.println("Cookies: " + Arrays.toString(request.getCookies()));
            if (token != null && jwtRSA.verifyToken(token, jwtUtils.getPublicKey())) {
                String userId = jwtRSA.extractClaim(token, "sub");

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId,
                        null, new ArrayList<>());

                System.out.println("Authorities: " + authentication.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            System.out
                    .println("Authentication after filter: " + SecurityContextHolder.getContext().getAuthentication());
        } catch (Exception e) {
            logger.error("Cannot set user authentication", e);
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null)
            return null;

        for (var cookie : request.getCookies()) {
            if ("jwtToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
