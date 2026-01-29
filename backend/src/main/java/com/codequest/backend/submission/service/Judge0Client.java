package com.codequest.backend.submission.service;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class Judge0Client {

    private final WebClient webClient;

    public Mono<List<Map<String, String>>> createBatchSubmission(List<Map<String, Object>> submissions) {
        return webClient.post()
                .uri("/submissions/batch?base64_encoded=false")
                .bodyValue(Map.of("submissions", submissions))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, String>>>() {
                });
    }

    @SuppressWarnings("unchecked")
    public Mono<List<Map<String, Object>>> getSubmissionResults(List<String> tokens) {
        String tokenParam = String.join(",", tokens);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/submissions/batch")
                        .queryParam("tokens", tokenParam)
                        .queryParam("base64_encoded", "false")
                        .queryParam("fields", "status,time,memory,stdout,stderr,compile_output")
                        .build())
                .retrieve()
                .bodyToMono(Map.class)
                .map(resp -> (List<Map<String, Object>>) resp.get("submissions"));
    }
}
