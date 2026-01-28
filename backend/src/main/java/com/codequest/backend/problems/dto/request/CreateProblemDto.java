package com.codequest.backend.problems.dto.request;

import java.util.List;

import com.codequest.backend.problems.model.Difficulty;
import com.codequest.backend.problems.model.Template;
import com.codequest.backend.problems.model.Testcase;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateProblemDto {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, message = "Description must be at least 10 characters")
    private String description;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    private List<String> tags;

    @NotNull(message = "Wrapper code is required")
    private String wrapperCode;

    @NotNull(message = "Test cases are required")
    @Size(min = 1, message = "At least one test case is required")
    private List<Testcase> testCases;

    @NotNull(message = "Templates are required")
    @Size(min = 1, message = "At least one template is required")
    private List<Template> templates;
}
