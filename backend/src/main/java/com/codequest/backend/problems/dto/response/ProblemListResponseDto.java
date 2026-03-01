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
public class ProblemListResponseDto {
    private Long id;
    private int problemNumber;
    private String title;
    private Difficulty difficulty;
    private List<String> tags;
}
