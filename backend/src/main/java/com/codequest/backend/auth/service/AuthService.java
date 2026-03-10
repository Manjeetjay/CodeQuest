package com.codequest.backend.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codequest.backend.auth.dto.AuthResponseDto;
import com.codequest.backend.auth.dto.LoginRequestDto;
import com.codequest.backend.auth.dto.RegisterRequestDto;
import com.codequest.backend.auth.model.Role;
import com.codequest.backend.auth.model.User;
import com.codequest.backend.auth.repository.UserRepository;
import com.codequest.backend.auth.security.JwtService;
import com.codequest.backend.exception.BadRequestException;
import com.codequest.backend.exception.DuplicateResourceException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email is already in use with another account");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username is already taken");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return new AuthResponseDto(jwtService.generateToken(user), user.getUsername(), user.getEmail(),
                user.getRole().toString());

    }

    @Transactional(readOnly = true)
    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid password");
        }
        return new AuthResponseDto(jwtService.generateToken(user), user.getUsername(), user.getEmail(),
                user.getRole().toString());

    }
}
