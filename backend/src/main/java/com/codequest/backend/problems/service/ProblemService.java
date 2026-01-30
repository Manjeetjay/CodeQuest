package com.codequest.backend.problems.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codequest.backend.problems.dto.request.CreateProblemDto;
import com.codequest.backend.problems.dto.request.UpdateProblemDto;
import com.codequest.backend.problems.dto.response.ProblemDetailResponseDto;
import com.codequest.backend.problems.dto.response.ProblemListResponseDto;
import com.codequest.backend.problems.dto.response.TemplateResponseDto;
import com.codequest.backend.problems.dto.response.TestcaseResponseDto;
import com.codequest.backend.problems.exception.DuplicateProblemException;
import com.codequest.backend.problems.exception.ProblemNotFoundException;
import com.codequest.backend.problems.model.Problem;
import com.codequest.backend.problems.model.Template;
import com.codequest.backend.problems.model.Testcase;
import com.codequest.backend.problems.repository.ProblemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProblemService {

    private final ProblemRepository problemRepository;

    @Transactional
    public ResponseEntity<String> createProblem(CreateProblemDto request) {
        log.info("Creating problem with title: {}", request.getTitle());

        if (problemRepository.existsByTitle(request.getTitle())) {
            throw new DuplicateProblemException(request.getTitle());
        }

        Problem problem = Problem.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .wrapperCode(request.getWrapperCode())
                .difficulty(request.getDifficulty())
                .tags(request.getTags())
                .testCases(request.getTestCases())
                .templates(request.getTemplates())
                .build();

        setProblemId(problem);
        problemRepository.save(problem);

        log.info("Problem created successfully with id: {}", problem.getId());
        return ResponseEntity.ok("Problem created successfully");
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ProblemDetailResponseDto> getProblem(Long id) {
        log.info("Fetching problem with id: {}", id);

        Problem problem = getProblemOrThrow(id);
        ProblemDetailResponseDto response = mapToProblemDetailResponse(problem);

        return ResponseEntity.ok(response);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<List<ProblemListResponseDto>> getAllProblems() {
        log.info("Fetching all problems");

        List<Problem> problems = problemRepository.findAll();
        List<ProblemListResponseDto> response = problems.stream()
                .map(this::mapToProblemListResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Page<ProblemListResponseDto>> getAllProblemsPaginated(Pageable pageable) {
        log.info("Fetching problems with pagination - page: {}, size: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<Problem> problemsPage = problemRepository.findAll(pageable);
        Page<ProblemListResponseDto> response = problemsPage.map(this::mapToProblemListResponse);

        return ResponseEntity.ok(response);
    }

    @Transactional
    public void deleteProblem(Long id) {
        log.info("Deleting problem with id: {}", id);

        getProblemOrThrow(id); // Verify exists before deleting
        problemRepository.deleteById(id);

        log.info("Problem deleted successfully with id: {}", id);
    }

    @Transactional
    public ResponseEntity<String> updateProblem(Long id, UpdateProblemDto request) {
        log.info("Updating problem with id: {}", id);

        Problem problem = getProblemOrThrow(id);

        problem.setTitle(request.getTitle());
        problem.setDescription(request.getDescription());
        problem.setDifficulty(request.getDifficulty());
        problem.setTags(request.getTags());

        problemRepository.save(problem);

        log.info("Problem updated successfully with id: {}", id);
        return ResponseEntity.ok("Problem updated successfully");
    }

    // Helper methods

    private Problem getProblemOrThrow(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new ProblemNotFoundException(id));
    }

    private void setProblemId(Problem problem) {
        for (Template template : problem.getTemplates()) {
            template.setProblem(problem);
        }
        for (Testcase testcase : problem.getTestCases()) {
            testcase.setProblem(problem);
        }
    }

    // Mapper methods

    private ProblemListResponseDto mapToProblemListResponse(Problem problem) {
        return ProblemListResponseDto.builder()
                .id(problem.getId())
                .title(problem.getTitle())
                .difficulty(problem.getDifficulty())
                .tags(problem.getTags())
                .build();
    }

    private ProblemDetailResponseDto mapToProblemDetailResponse(Problem problem) {
        return ProblemDetailResponseDto.builder()
                .id(problem.getId())
                .title(problem.getTitle())
                .description(problem.getDescription())
                .difficulty(problem.getDifficulty())
                .tags(problem.getTags())
                .templates(problem.getTemplates().stream()
                        .map(this::mapToTemplateResponse)
                        .collect(Collectors.toList()))
                .testCases(problem.getTestCases().stream()
                        .map(this::mapToTestcaseResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    private TemplateResponseDto mapToTemplateResponse(Template template) {
        return TemplateResponseDto.builder()
                .id(template.getId())
                .languageId(template.getLanguageId())
                .template(template.getTemplate())
                .build();
    }

    private TestcaseResponseDto mapToTestcaseResponse(Testcase testcase) {
        return TestcaseResponseDto.builder()
                .id(testcase.getId())
                .input(testcase.getInput())
                .output(testcase.getOutput())
                .sample(testcase.isSample())
                .build();
    }
}
