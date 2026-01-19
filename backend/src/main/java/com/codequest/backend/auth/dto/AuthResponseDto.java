package com.codequest.backend.auth.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private String type = "Bearer";
    private String username;
    private String email;

    public AuthResponseDto(String accessToken, String username, String email) {
        this.token = accessToken;
        this.username = username;
        this.email = email;
    }
}
