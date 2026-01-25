package com.codequest.backend.problems.dto.response;

import java.util.List;

import com.codequest.backend.problems.model.Difficulty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProblemDetailResponseDto {
    private Long id;
    private String title;
    private String description;
    private Difficulty difficulty;
    private List<String> tags;
    private List<TemplateResponseDto> templates;
    private List<TestcaseResponseDto> testCases;
}
