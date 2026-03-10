package com.codequest.backend.problems.dto.response;

import java.util.List;

import com.codequest.backend.problems.model.Difficulty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProblemListResponseDto implements Serializable {
    private Long id;
    private int problemNumber;
    private String title;
    private Difficulty difficulty;
    private List<String> tags;
}
