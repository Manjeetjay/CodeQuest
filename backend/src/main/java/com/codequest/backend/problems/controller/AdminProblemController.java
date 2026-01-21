package com.codequest.backend.problems.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.problems.dto.CreateProblemDto;
import com.codequest.backend.problems.dto.UpdateProblemDto;
import com.codequest.backend.problems.model.Problem;
import com.codequest.backend.problems.service.ProblemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/problem")
@RequiredArgsConstructor
public class AdminProblemController {

    private final ProblemService problemService;

    @PostMapping
    public ResponseEntity<String> createProblem(@RequestBody CreateProblemDto request) {

        // remove when debuggin ends
        System.out.println("=== AdminProblemController.createProblem() HIT ===");
        System.out.println("Request: " + request);
        return problemService.createProblem(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblem(@PathVariable Long id) {
        return problemService.getProblem(id);
    }

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return problemService.getAllProblems();
    }

    @DeleteMapping("/{id}")
    public void deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProblem(@PathVariable Long id, @RequestBody UpdateProblemDto request) {
        return problemService.updateProblem(id, request);
    }

}
