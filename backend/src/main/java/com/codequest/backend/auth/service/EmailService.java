package com.codequest.backend.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${backend.url}")
    private String backendUrl;

    @Value("${spring.mail.username}")
    private String from;

    public void sendVerificationEmail(String email, String token) {
        try {
            String link = String.format("%s/api/auth/verify?token=%s", backendUrl, token);

            String message = String.format("""
                    Welcome to CodeQuest!

                    Thank you for registering. Please verify your email address by clicking the link below:

                    %s

                    This link will expire in 15 minutes.

                    If you didn't create an account, please ignore this email.

                    Best regards,
                    CodeQuest Team
                    """, link);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Verify your CodeQuest account");
            mailMessage.setText(message);
            mailMessage.setFrom(from);

            mailSender.send(mailMessage);
            log.info("Verification email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", email, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

}
