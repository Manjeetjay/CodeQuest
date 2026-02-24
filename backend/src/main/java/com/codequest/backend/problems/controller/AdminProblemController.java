package com.codequest.backend.problems.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codequest.backend.problems.dto.request.CreateProblemDto;
import com.codequest.backend.problems.dto.request.UpdateProblemDto;
import com.codequest.backend.problems.dto.response.ProblemDetailResponseDto;
import com.codequest.backend.problems.dto.response.ProblemListResponseDto;
import com.codequest.backend.problems.service.ProblemService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin/problem")
@RequiredArgsConstructor
@Slf4j
public class AdminProblemController {

    private final ProblemService problemService;

    @PostMapping
    public ResponseEntity<String> createProblem(@Valid @RequestBody CreateProblemDto request) {
        log.info("Admin creating problem: {}", request.getTitle());
        return problemService.createProblem(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemDetailResponseDto> getProblem(@PathVariable Long id) {
        log.info("Admin fetching problem with id: {}", id);
        return problemService.getProblem(id);
    }

    @GetMapping
    public ResponseEntity<Page<ProblemListResponseDto>> getAllProblems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        log.info("Admin fetching all problems - page: {}, size: {}, sortBy: {}", page, size, sortBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return problemService.getAllProblemsPaginated(pageable);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProblem(@PathVariable Long id) {
        log.info("Admin deleting problem with id: {}", id);
        problemService.deleteProblem(id);
        return ResponseEntity.ok("Problem deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProblem(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProblemDto request) {
        log.info("Admin updating problem with id: {}", id);
        return problemService.updateProblem(id, request);
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<String> bulkUploadProblems(@RequestBody List<CreateProblemDto> problems) {
        log.info("Admin bulk uploading problems: {}", problems.size());
        return problemService.bulkUploadProblems(problems);
    }
}
