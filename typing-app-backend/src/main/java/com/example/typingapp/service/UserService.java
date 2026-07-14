package com.example.typingapp.service;

import com.example.typingapp.dto.AuthResponse;
import com.example.typingapp.dto.LoginRequest;
import com.example.typingapp.dto.RegisterRequest;
import com.example.typingapp.dto.UserResponse;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.UserRepository;
import com.example.typingapp.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository repo,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ========================= REGISTER =========================

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

    // ========================= LOGIN =========================

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

        UserResponse userResponse = new UserResponse(

                user.getId(),
                user.getUsername(),
                user.getRole().name()

        );

        return new AuthResponse(token, userResponse);

    }

    // ========================= CHANGE PASSWORD =========================

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