package com.codequest.backend.problems.dto;

import java.util.List;

import com.codequest.backend.problems.model.Difficulty;
import com.codequest.backend.problems.model.Template;
import com.codequest.backend.problems.model.Testcase;

import lombok.Data;

@Data
public class UpdateProblemDto {
    private String title;
    private String description;
    private Difficulty difficulty;
    private List<String> tags;
}
