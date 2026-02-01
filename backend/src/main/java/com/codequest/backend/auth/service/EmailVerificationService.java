package com.codequest.backend.auth.service;

import com.codequest.backend.auth.dto.EmailVerificationResponse;
import com.codequest.backend.auth.exception.InvalidEmailException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
@Slf4j
public class EmailVerificationService {

    private final WebClient webClient;

    public EmailVerificationService(@Qualifier("emailVerificationWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public void verifyEmail(String email) {
        log.info("Verifying email: {}", email);

        try {
            EmailVerificationResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1/verify")
                            .queryParam("email", email)
                            .build())
                    .retrieve()
                    .onStatus(status -> !status.is2xxSuccessful(),
                            clientResponse -> {
                                log.error("Email verification API returned status {}", clientResponse.statusCode());
                                return Mono.error(new InvalidEmailException(
                                        "Email verification service is currently unavailable. Please try again later.",
                                        "api_error"));
                            })
                    .bodyToMono(EmailVerificationResponse.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();

            if (response == null) {
                throw new InvalidEmailException(
                        "Email verification service returned no response. Please try again later.",
                        "no_response");
            }

            validateEmailResponse(response);

            // if the api is not available or the limit is exausted then we should allow the
            // email
            if (response.getStatus().equals("api_error") || response.getStatus().equals("limit_exceeded")) {
                // check if the email looks right
                if (email.contains("@") && (email.contains(".com") || email.contains(".in"))) {
                    log.warn("Email verification service is not available. Allowing email: {}", email);
                    return;
                }
                throw new InvalidEmailException(
                        "Email verification service is currently unavailable. Please try again later.",
                        "api_error");
            }

            log.info("Email verification successful for: {}", email);
        } catch (Exception e) {
            if (e instanceof InvalidEmailException) {
                throw e;
            }
            log.error("Error during email verification", e);

            if (e.getMessage() != null && e.getMessage().contains("timeout")) {
                throw new InvalidEmailException(
                        "Email verification service is taking too long to respond. Please try again later.",
                        "timeout");
            }

            throw new InvalidEmailException(
                    "Email verification failed due to an unexpected error. Please try again later.",
                    "unknown_error");
        }

    }

    private void validateEmailResponse(EmailVerificationResponse response) {
        // Check if email is invalid
        if ("invalid".equalsIgnoreCase(response.getStatus())) {
            String reason = response.getReason() != null ? response.getReason() : "unknown";
            String message = getErrorMessageForReason(reason, response);
            throw new InvalidEmailException(message, reason);
        }

        // Check if email is disposable
        if (Boolean.TRUE.equals(response.getDisposable())) {
            throw new InvalidEmailException(
                    "Disposable or temporary email addresses are not allowed. Please use a permanent email address.",
                    "disposable_email");
        }

        // Check if email is a role-based email
        if (Boolean.TRUE.equals(response.getRole())) {
            throw new InvalidEmailException(
                    "Role-based email addresses (e.g., admin@, info@) are not allowed. Please use a personal email address.",
                    "role_email");
        }
    }

    private String getErrorMessageForReason(String reason, EmailVerificationResponse response) {
        return switch (reason.toLowerCase()) {
            case "rejected_email" ->
                "The email address '" + response.getEmail()
                        + "' is not valid or has been rejected. Please check and try again.";
            case "invalid_format" ->
                "The email address format is invalid. Please enter a valid email address.";
            case "invalid_domain" ->
                "The email domain does not exist or is invalid. Please check the email address.";
            case "invalid_mx" ->
                "The email domain does not have valid mail servers. Please use a different email address.";
            default ->
                "The email address is invalid. Please enter a valid email address.";
        };
    }
}
