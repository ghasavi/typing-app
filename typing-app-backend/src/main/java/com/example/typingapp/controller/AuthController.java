package com.example.typingapp.controller;

import com.example.typingapp.dto.AuthResponse;
import com.example.typingapp.dto.ChangePasswordRequest;
import com.example.typingapp.dto.LoginRequest;
import com.example.typingapp.dto.RegisterRequest;
import com.example.typingapp.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {

        this.service = service;

    }

    // ========================= REGISTER =========================

    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request

    ) {

        return service.register(request);

    }

    // ========================= LOGIN =========================

    @PostMapping("/login")
    public AuthResponse login(

            @RequestBody LoginRequest request

    ) {

        return service.login(request);

    }

    // ========================= CHANGE PASSWORD =========================

    @PostMapping("/change-password")
    public String changePassword(

            Authentication authentication,

            @RequestBody ChangePasswordRequest request

    ) {

        return service.changePassword(

                authentication.getName(),

                request.getCurrentPassword(),

                request.getNewPassword()

        );

    }

}