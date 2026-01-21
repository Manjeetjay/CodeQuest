package com.codequest.backend.problems.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.problems.model.Problem;
import com.codequest.backend.problems.service.ProblemService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/u/problem")
@RequiredArgsConstructor
public class UserProblemController {

    private final ProblemService problemService;

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblem(@PathVariable Long id) {
        return problemService.getProblem(id);
    }

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return problemService.getAllProblems();
    }
}
