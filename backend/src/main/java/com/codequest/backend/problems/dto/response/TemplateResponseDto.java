package com.codequest.backend.problems.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TemplateResponseDto implements Serializable {
    private Long id;
    private int languageId;
    private String template;
}
