package com.codequest.backend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.auth.dto.HealthResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/health")
@Slf4j
public class HealthController {
    
    @GetMapping
    public ResponseEntity<HealthResponse> health() {
        log.info("Health check requested");
        return ResponseEntity.ok(HealthResponse.builder()
                .status("Good Health")
                .message("CodeQuest is running")
                .build());
    }
}
