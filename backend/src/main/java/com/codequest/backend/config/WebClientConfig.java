package com.codequest.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient judge0WebClient(
            @Value("${judge0.url}") String url,
            @Value("${judge0.api-key}") String apiKey,
            @Value("${judge0.host}") String host) {
        return WebClient.builder()
                .baseUrl(url)
                .defaultHeader("x-rapidapi-key", apiKey)
                .defaultHeader("x-rapidapi-host", host)
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Bean
    public WebClient emailVerificationWebClient(
            @Value("${email-verification.url}") String url,
            @Value("${email-verification.api-key}") String apiKey,
            @Value("${email-verification.host}") String host) {
        return WebClient.builder()
                .baseUrl(url)
                .defaultHeader("x-rapidapi-key", apiKey)
                .defaultHeader("x-rapidapi-host", host)
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
