package com.codequest.backend.problems.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.problems.dto.response.ProblemDetailResponseDto;
import com.codequest.backend.problems.dto.response.ProblemListResponseDto;
import com.codequest.backend.problems.service.ProblemService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/u/problem")
@RequiredArgsConstructor
@Slf4j
public class UserProblemController {

    private final ProblemService problemService;

    @GetMapping("/{id}")
    public ResponseEntity<ProblemDetailResponseDto> getProblem(@PathVariable Long id) {
        log.info("User fetching problem with id: {}", id);
        return ResponseEntity.ok(problemService.getProblem(id));
    }

    @GetMapping
    public ResponseEntity<List<ProblemListResponseDto>> getAllProblems() {
        log.info("User fetching all problems");
        return ResponseEntity.ok(problemService.getAllProblems());
    }
}
