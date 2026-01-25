package com.codequest.backend.problems.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TemplateDto {

    @NotBlank(message = "Language is required")
    @Size(min = 1, max = 50, message = "Language must be between 1 and 50 characters")
    private String language;

    @NotBlank(message = "Template code is required")
    private String template;
}
