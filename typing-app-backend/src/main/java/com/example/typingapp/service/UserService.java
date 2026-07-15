package com.example.typingapp.service;

import com.example.typingapp.dto.*;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.UserRepository;
import com.example.typingapp.security.GoogleTokenVerifier;
import com.example.typingapp.security.JwtService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GoogleTokenVerifier googleTokenVerifier;

    public UserService(
            UserRepository repo,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            GoogleTokenVerifier googleTokenVerifier
    ) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.googleTokenVerifier = googleTokenVerifier;
    }

    // =========================================================
    // REGISTER
    // =========================================================

    public String register(RegisterRequest request) {

        if (repo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }

        if (repo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered.");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        repo.save(user);

        return "User registered successfully!";
    }

    // =========================================================
    // NORMAL LOGIN
    // =========================================================

    public AuthResponse login(LoginRequest request) {

        User user = repo.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid username or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Your account has been blocked.");
        }

        String token = jwtService.generateToken(user.getUsername());

        UserResponse response = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(token, response);
    }

    // =========================================================
    // GOOGLE LOGIN
    // =========================================================

    public AuthResponse loginWithGoogle(GoogleLoginRequest request)
            throws GeneralSecurityException, IOException {

        GoogleIdToken.Payload payload =
                googleTokenVerifier.verify(request.getCredential());

        if (payload == null) {
            throw new RuntimeException("Invalid Google Token.");
        }

        String email = payload.getEmail();

        String name = (String) payload.get("name");

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) {

            user = new User();

            user.setEmail(email);

            String username =
                    name.replaceAll("\\s+", "") +
                            UUID.randomUUID().toString().substring(0, 4);

            user.setUsername(username);

            user.setPassword(
                    passwordEncoder.encode(UUID.randomUUID().toString())
            );

            repo.save(user);
        }

        if (!user.isActive()) {
            throw new RuntimeException("Your account has been blocked.");
        }

        String token = jwtService.generateToken(user.getUsername());

        UserResponse response = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(token, response);
    }

    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    public String changePassword(
            String username,
            String currentPassword,
            String newPassword
    ) {

        User user = repo.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                currentPassword,
                user.getPassword())) {

            throw new RuntimeException("Current password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        repo.save(user);

        return "Password changed successfully.";
    }
}