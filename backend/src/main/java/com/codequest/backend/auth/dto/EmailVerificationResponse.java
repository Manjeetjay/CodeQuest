package com.codequest.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EmailVerificationResponse {

    @JsonProperty("disposable")
    private Boolean disposable;

    @JsonProperty("domain")
    private String domain;

    @JsonProperty("email")
    private String email;

    @JsonProperty("public")
    private Boolean publicEmail;

    @JsonProperty("reason")
    private String reason;

    @JsonProperty("role")
    private Boolean role;

    @JsonProperty("status")
    private String status;

    @JsonProperty("user")
    private String user;
}
