package com.codequest.backend.problems.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TestcaseDto {

    @NotBlank(message = "Input is required")
    private String input;

    @NotBlank(message = "Output is required")
    private String output;

    private boolean sample = false;
}
