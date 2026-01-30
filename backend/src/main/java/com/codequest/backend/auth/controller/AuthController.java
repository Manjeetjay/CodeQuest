package com.codequest.backend.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.auth.dto.AuthResponseDto;
import com.codequest.backend.auth.dto.LoginRequestDto;
import com.codequest.backend.auth.dto.RegisterRequestDto;
import com.codequest.backend.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

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
}