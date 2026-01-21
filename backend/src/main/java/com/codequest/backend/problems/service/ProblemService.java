package com.codequest.backend.problems.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.codequest.backend.problems.dto.CreateProblemDto;
import com.codequest.backend.problems.dto.UpdateProblemDto;
import com.codequest.backend.problems.model.Problem;
import com.codequest.backend.problems.model.Template;
import com.codequest.backend.problems.model.Testcase;
import com.codequest.backend.problems.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ResponseEntity<String> createProblem(CreateProblemDto request) {
        // if (problemRepository.existsByTitle(request.getTitle())) {
        // throw new RuntimeException("Problem already exists");
        // }
        Problem problem = Problem.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .difficulty(request.getDifficulty())
                .tags(request.getTags())
                .testCases(request.getTestCases())
                .templates(request.getTemplates())
                .build();
        setProblemId(problem);
        problemRepository.save(problem);
        return ResponseEntity.ok("Problem created successfully");
    }

    public ResponseEntity<Problem> getProblem(Long id) {
        if (!problemRepository.findById(id).isPresent()) {
            throw new RuntimeException("Problem not found");
        }
        return ResponseEntity.ok(problemRepository.findById(id).get());
    }

    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(problemRepository.findAll());
    }

    public void deleteProblem(Long id) {
        if (!problemRepository.findById(id).isPresent()) {
            throw new RuntimeException("Problem not found");
        }
        problemRepository.deleteById(id);
    }

    public ResponseEntity<String> updateProblem(Long id, UpdateProblemDto request) {
        if (!problemRepository.findById(id).isPresent()) {
            throw new RuntimeException("Problem not found");
        }
        Problem problem = problemRepository.findById(id).get();
        problem.setTitle(request.getTitle());
        problem.setDescription(request.getDescription());
        problem.setDifficulty(request.getDifficulty());
        problem.setTags(request.getTags());
        problemRepository.save(problem);
        return ResponseEntity.ok("Problem updated successfully");
    }

    // sets the problemId for both templates and testcases
    public void setProblemId(Problem problem) {
        for (Template template : problem.getTemplates()) {
            template.setProblem(problem);
        }
        for (Testcase testcase : problem.getTestCases()) {
            testcase.setProblem(problem);
        }
    }

}
