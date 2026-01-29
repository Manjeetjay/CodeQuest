package com.codequest.backend.submission.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.submission.dto.SubmissionDto;
import com.codequest.backend.submission.service.SubmissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/u/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<SubmissionDto> createSubmission(@RequestBody SubmissionDto request) {
        return ResponseEntity.ok(submissionService.createSubmission(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmissionDto> getSubmission(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<SubmissionDto>> getMySubmissions(@PathVariable String email) {
        return ResponseEntity.ok(submissionService.getMySubmissions(email));
    }

    @GetMapping("/problem/{problemId}/user/{email}")
    public ResponseEntity<List<SubmissionDto>> getMySubmissionsForProblem(
            @PathVariable Long problemId,
            @PathVariable String email) {
        return ResponseEntity.ok(submissionService.getMySubmissionsForProblem(problemId, email));
    }

}
