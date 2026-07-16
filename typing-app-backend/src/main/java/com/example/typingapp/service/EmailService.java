package com.example.typingapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {

        this.mailSender = mailSender;

    }

    public void sendOtpEmail(

            String to,

            String otp

    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);

        message.setTo(to);

        message.setSubject("Typing App Password Reset");

        message.setText("""

Hello,

Your password reset code is:

%s

This code expires in 10 minutes.

If you didn't request a password reset, simply ignore this email.

Typing App
""".formatted(otp));

        try {

            mailSender.send(message);
            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {

            e.printStackTrace();

        }

    }

}