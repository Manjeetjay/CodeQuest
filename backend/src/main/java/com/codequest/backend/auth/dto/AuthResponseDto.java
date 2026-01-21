package com.codequest.backend.auth.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private String type = "Bearer";
    private String username;
    private String email;
    private String role;

    public AuthResponseDto(String accessToken, String username, String email, String role) {
        this.token = accessToken;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
