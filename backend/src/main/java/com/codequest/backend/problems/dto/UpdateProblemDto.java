package com.codequest.backend.problems.dto;

import java.util.List;

import com.codequest.backend.problems.model.Difficulty;

import lombok.Data;

@Data
public class UpdateProblemDto {
    private String title;
    private String description;
    private Difficulty difficulty;
    private List<String> tags;
}
