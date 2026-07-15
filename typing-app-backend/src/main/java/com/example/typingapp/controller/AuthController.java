package com.example.typingapp.controller;

import com.example.typingapp.dto.*;
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

    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request

    ) {

        return service.register(request);

    }

    @PostMapping("/login")
    public AuthResponse login(

            @RequestBody LoginRequest request

    ) {

        return service.login(request);

    }

    @PostMapping("/google")
    public AuthResponse googleLogin(

            @RequestBody GoogleLoginRequest request

    ) throws Exception {

        return service.loginWithGoogle(request);

    }

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