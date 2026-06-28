package com.example.typingapp.controller;

import com.example.typingapp.dto.AuthResponse;
import com.example.typingapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {

        return service.register(
                body.get("username"),
                body.get("password")
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody Map<String, String> body) {

        return service.login(
                body.get("username"),
                body.get("password")
        );
    }
}