package com.example.typingapp.controller;

import com.example.typingapp.dto.*;
import com.example.typingapp.service.PasswordResetService;
import com.example.typingapp.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService service;
    private final PasswordResetService passwordResetService;

    public AuthController(
            UserService service,
            PasswordResetService passwordResetService
    ) {

        this.service = service;
        this.passwordResetService = passwordResetService;

    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) {

        System.out.println("Forgot password endpoint called");

        return passwordResetService.sendOtp(request);
    }
    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {

        return service.register(request);

    }

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {

        return service.login(request);

    }

    // =====================================================
    // GOOGLE LOGIN
    // =====================================================

    @PostMapping("/google")
    public AuthResponse googleLogin(
            @RequestBody GoogleLoginRequest request
    ) throws Exception {

        return service.loginWithGoogle(request);

    }

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

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

    // =====================================================
    // FORGOT PASSWORD
    // =====================================================



    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {

        return passwordResetService.resetPassword(request);

    }

}