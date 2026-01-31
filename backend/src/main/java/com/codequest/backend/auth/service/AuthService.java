package com.codequest.backend.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codequest.backend.auth.dto.AuthResponseDto;
import com.codequest.backend.auth.dto.LoginRequestDto;
import com.codequest.backend.auth.dto.RegisterRequestDto;
import com.codequest.backend.auth.model.Role;
import com.codequest.backend.auth.model.User;
import com.codequest.backend.auth.model.VerificationToken;
import com.codequest.backend.auth.repository.UserRepository;
import com.codequest.backend.auth.repository.VerificationTokenRepository;
import com.codequest.backend.auth.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final EmailService emailService;

    @Transactional
    public AuthResponseDto register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use with another account");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .isVerified(false)
                .build();

        userRepository.save(user);

        if (user.getIsVerified()) {
            return new AuthResponseDto(jwtService.generateToken(user), user.getUsername(), user.getEmail(),
                    user.getRole().toString());
        } else {
            // send verification email
            String token = UUID.randomUUID().toString();
            VerificationToken verificationToken = VerificationToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusMinutes(15))
                    .build();
            verificationTokenRepository.save(verificationToken);

            // send verification email
            emailService.sendVerificationEmail(user.getEmail(), token);

            return null;
        }

    }

    @Transactional(readOnly = true)
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getIsVerified()) {
            throw new RuntimeException("Account is not verified. Please check your email to verify your account.");
        }

        return new AuthResponseDto(jwtService.generateToken(user), user.getUsername(), user.getEmail(),
                user.getRole().toString());

    }
}
