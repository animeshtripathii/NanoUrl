package com.url.shortner.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthentictonFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthentictonFilter.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtTokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            // Get JWT from Header
            String jwt = jwtTokenProvider.getJwtFromHeader(request);

            if (jwt != null && jwtTokenProvider.validateToken(jwt)) {

                // Get username from JWT
                String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);

                // Load user details
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                if (userDetails != null) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);
                }
            }

        } catch (Exception e) {
            // Log but do NOT rethrow — a bad/missing token means the request
            // proceeds unauthenticated. Spring Security's authorization rules
            // will then allow or deny it. Re-throwing here blocks ALL requests
            // including public login/register endpoints.
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}