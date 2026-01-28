package com.codequest.backend.submission.dto;

import lombok.Data;

@Data
public class SubmissionDto {
    private Long languageId;
    private String code;
    private Long problemId;
    private String email;
}
