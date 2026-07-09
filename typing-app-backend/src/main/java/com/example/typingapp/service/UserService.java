package com.example.typingapp.service;

import com.example.typingapp.dto.AuthResponse;
import com.example.typingapp.dto.UserResponse;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.UserRepository;
import com.example.typingapp.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository repo,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(String username, String password) {

        if (repo.findByUsername(username).isPresent()) {
            return "Username already exists!";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        repo.save(user);

        return "User registered successfully!";
    }

    public AuthResponse login(String username, String password) {

        Optional<User> userOpt = repo.findByUsername(username);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername());

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(token, userResponse);
    }

    public String changePassword(String username,
                                 String currentPassword,
                                 String newPassword) {

        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        repo.save(user);

        return "Password changed successfully!";

    }
}