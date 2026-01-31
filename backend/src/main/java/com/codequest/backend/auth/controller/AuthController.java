package com.codequest.backend.auth.controller;

import org.springframework.web.bind.annotation.RestController;
import com.codequest.backend.auth.dto.AuthResponseDto;
import com.codequest.backend.auth.dto.LoginRequestDto;
import com.codequest.backend.auth.dto.RegisterRequestDto;
import com.codequest.backend.auth.model.User;
import com.codequest.backend.auth.model.VerificationToken;
import com.codequest.backend.auth.repository.UserRepository;
import com.codequest.backend.auth.repository.VerificationTokenRepository;
import com.codequest.backend.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    /*
     * Registration Endpoint :
     * This endpoint takes users {email, username, password} and registers the user.
     * Also returns a token with all the other details.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto request) {
        AuthResponseDto response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    /*
     * Login Endpoint :
     * This endpoint takes details like {email, password} and login users.
     * Also returns the token and details like register request.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request) {
        AuthResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /*
     * Verify Email Endpoint :
     * This endpoint takes a token and verifies the email.
     */
    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired");
        }

        User user = verificationToken.getUser();
        user.setIsVerified(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);

        return ResponseEntity.ok("Email verified successfully");
    }

}