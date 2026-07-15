package com.example.typingapp.service;

import com.example.typingapp.dto.ForgotPasswordRequest;
import com.example.typingapp.dto.ResetPasswordRequest;
import com.example.typingapp.model.PasswordResetOtp;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.PasswordResetOtpRepository;
import com.example.typingapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetOtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordResetService(

            UserRepository userRepository,

            PasswordResetOtpRepository otpRepository,

            PasswordEncoder passwordEncoder,

            EmailService emailService

    ) {

        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;

    }

    public String sendOtp(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())

                .orElseThrow(() ->
                        new RuntimeException("Email not found."));

        String otp = String.format(

                "%06d",

                new Random().nextInt(999999)

        );

        PasswordResetOtp resetOtp = otpRepository

                .findByEmail(user.getEmail())

                .orElse(new PasswordResetOtp());

        resetOtp.setEmail(user.getEmail());

        resetOtp.setOtp(otp);

        resetOtp.setExpiryTime(

                LocalDateTime.now().plusMinutes(10)

        );

        otpRepository.save(resetOtp);

        emailService.sendOtpEmail(

                user.getEmail(),

                otp

        );

        return "OTP sent successfully.";

    }

    public String resetPassword(

            ResetPasswordRequest request

    ) {

        PasswordResetOtp otp = otpRepository

                .findByEmailAndOtp(

                        request.getEmail(),

                        request.getOtp()

                )

                .orElseThrow(() ->
                        new RuntimeException("Invalid OTP."));

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {

            throw new RuntimeException("OTP expired.");

        }

        User user = userRepository

                .findByEmail(request.getEmail())

                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        user.setPassword(

                passwordEncoder.encode(request.getNewPassword())

        );

        userRepository.save(user);

        otpRepository.delete(otp);

        return "Password reset successful.";

    }

}