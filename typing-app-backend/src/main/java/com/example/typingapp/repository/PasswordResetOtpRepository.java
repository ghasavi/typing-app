package com.example.typingapp.repository;

import com.example.typingapp.model.PasswordResetOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findByEmail(String email);

    Optional<PasswordResetOtp> findByEmailAndOtp(
            String email,
            String otp
    );

}