package com.codequest.backend.problems.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TemplateDto {

    @NotBlank(message = "Language is required")
    private int languageId;

    @NotBlank(message = "Template code is required")
    private String template;
}
