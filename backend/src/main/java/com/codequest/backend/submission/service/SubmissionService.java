package com.codequest.backend.submission.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.codequest.backend.problems.model.Problem;
import com.codequest.backend.problems.model.Testcase;
import com.codequest.backend.problems.repository.ProblemRepository;
import com.codequest.backend.submission.dto.SubmissionDto;
import com.codequest.backend.submission.model.Submission;
import com.codequest.backend.submission.model.SubmissionStatus;
import com.codequest.backend.submission.model.TestResult;
import com.codequest.backend.submission.repository.SubmissionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final Judge0Client judge0Client;
    private final ProblemRepository problemRepository;

    @Transactional
    public SubmissionDto createSubmission(SubmissionDto request) {

        Problem problem = problemRepository.getById(request.getProblemId());
        List<Testcase> testCases = problem.getTestCases();

        int languageId = request.getLanguageId();

        // Apply wrapper code to user's code
        String fullCode = problem.getWrapperCode() + "\n" + request.getCode();

        // log.info("Full code being sent to Judge0:\n{}", fullCode);

        List<Map<String, Object>> judgeSubmissions = testCases.stream()
                .map(tc -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("language_id", languageId);
                    m.put("source_code", fullCode);
                    m.put("stdin", tc.getInput() == null ? "" : tc.getInput());
                    m.put("expected_output", tc.getOutput());
                    return m;
                })
                .toList();

        List<Map<String, String>> tokens = judge0Client
                .createBatchSubmission(judgeSubmissions)
                .block();

        List<String> tokenList = tokens.stream()
                .map(t -> t.get("token"))
                .toList();

        Submission submission = Submission.builder()
                .email(request.getEmail())
                .problemId(request.getProblemId())
                .languageId(languageId)
                .code(request.getCode())
                .status(SubmissionStatus.PENDING)
                .judgeTokens(tokenList)
                .totalTests(testCases.size())
                .build();

        submission = submissionRepository.save(submission);

        // Asynchronously fetch results after a delay
        final Long submissionId = submission.getId();
        fetchAndUpdateResults(submissionId, tokenList);

        SubmissionDto submissionDto = new SubmissionDto();
        submissionDto.setId(submission.getId());
        submissionDto.setCode(request.getCode());
        submissionDto.setEmail(request.getEmail());
        submissionDto.setLanguageId(languageId);
        submissionDto.setProblemId(request.getProblemId());
        submissionDto.setStatus(SubmissionStatus.PENDING);

        return submissionDto;
    }

    @Async
    @Transactional
    public void fetchAndUpdateResults(Long submissionId, List<String> tokens) {
        try {
            // Wait for Judge0 to process submissions
            Thread.sleep(3000);

            List<Map<String, Object>> results = judge0Client
                    .getSubmissionResults(tokens)
                    .block();

            Submission submission = submissionRepository.findById(submissionId)
                    .orElseThrow(() -> new RuntimeException("Submission not found"));

            List<TestResult> testResults = new ArrayList<>();
            int passedCount = 0;

            for (Map<String, Object> result : results) {
                @SuppressWarnings("unchecked")
                Map<String, Object> status = (Map<String, Object>) result.get("status");
                Integer statusId = (Integer) status.get("id");
                String statusDesc = (String) status.get("description");

                // Status ID 3 = Accepted in Judge0
                boolean passed = statusId != null && statusId == 3;
                if (passed) {
                    passedCount++;
                }

                TestResult testResult = TestResult.builder()
                        .statusId(statusId)
                        .statusDescription(statusDesc)
                        .time((String) result.get("time"))
                        .memory((Integer) result.get("memory"))
                        .stdout((String) result.get("stdout"))
                        .stderr((String) result.get("stderr"))
                        .compileOutput((String) result.get("compile_output"))
                        .passed(passed)
                        .build();

                testResults.add(testResult);
            }

            submission.setResults(testResults);
            submission.setPassedTests(passedCount);
            submission.setStatus(passedCount == submission.getTotalTests()
                    ? SubmissionStatus.COMPLETED
                    : SubmissionStatus.FAILED);

            submissionRepository.save(submission);

            log.info("Updated submission {} with results: {}/{} tests passed",
                    submissionId, passedCount, submission.getTotalTests());

        } catch (Exception e) {
            log.error("Error fetching results for submission {}: {}", submissionId, e.getMessage());
            // Update submission to failed status
            submissionRepository.findById(submissionId).ifPresent(sub -> {
                sub.setStatus(SubmissionStatus.FAILED);
                submissionRepository.save(sub);
            });
        }
    }

    @Transactional(readOnly = true)
    public SubmissionDto getSubmissionById(Long id) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        SubmissionDto dto = new SubmissionDto();
        dto.setId(submission.getId());
        dto.setCode(submission.getCode());
        dto.setEmail(submission.getEmail());
        dto.setLanguageId(submission.getLanguageId());
        dto.setProblemId(submission.getProblemId());
        dto.setStatus(submission.getStatus());
        dto.setPassedTests(submission.getPassedTests());
        dto.setTotalTests(submission.getTotalTests());
        dto.setResults(submission.getResults());

        return dto;
    }

    @Transactional(readOnly = true)
    public List<SubmissionDto> getMySubmissions(String email) {
        List<Submission> submissions = submissionRepository.findByEmail(email);
        return submissions.stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SubmissionDto> getMySubmissionsForProblem(Long problemId, String email) {
        List<Submission> submissions = submissionRepository
                .findByProblemIdAndEmailOrderByCreatedAtDesc(problemId, email);
        return submissions.stream()
                .map(this::toDto)
                .toList();
    }

    private SubmissionDto toDto(Submission submission) {
        SubmissionDto dto = new SubmissionDto();
        dto.setId(submission.getId());
        dto.setCode(submission.getCode());
        dto.setEmail(submission.getEmail());
        dto.setLanguageId(submission.getLanguageId());
        dto.setProblemId(submission.getProblemId());
        dto.setStatus(submission.getStatus());
        dto.setPassedTests(submission.getPassedTests());
        dto.setTotalTests(submission.getTotalTests());
        dto.setResults(submission.getResults());
        dto.setCreatedAt(submission.getCreatedAt());
        return dto;
    }

}
