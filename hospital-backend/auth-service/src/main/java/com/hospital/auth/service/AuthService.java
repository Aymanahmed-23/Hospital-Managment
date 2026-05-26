package com.hospital.auth.service;

import com.hospital.auth.model.AuthResponse;
import com.hospital.auth.model.LoginRequest;
import com.hospital.auth.model.RegisterRequest;
import com.hospital.auth.model.User;
import com.hospital.auth.repository.UserRepository;
import com.hospital.auth.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() == null || request.getRole().isBlank() ? "USER" : request.getRole().toUpperCase());

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getUsername(), saved.getEmail(), saved.getRole());
        return new AuthResponse(token, saved.getUsername(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getRole());
    }

    public boolean validateToken(String token) {
        return jwtService.isTokenValid(token);
    }

    public String extractUsername(String token) {
        return jwtService.extractUsername(token);
    }

    public String extractEmail(String token) {
        return jwtService.extractEmail(token);
    }

    public String extractRole(String token) {
        return jwtService.extractRole(token);
    }
}
