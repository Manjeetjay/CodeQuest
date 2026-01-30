package com.codequest.backend.submission.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.codequest.backend.submission.model.SubmissionStatus;
import com.codequest.backend.submission.model.TestResult;

import lombok.Data;

@Data
public class SubmissionDto {
    private Long id;
    private int languageId;
    private String code;
    private Long problemId;
    private String email;
    private SubmissionStatus status;
    private List<TestResult> results;
    private Integer passedTests;
    private Integer totalTests;
    private LocalDateTime createdAt;
}
