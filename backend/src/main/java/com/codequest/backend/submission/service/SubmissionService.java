package com.codequest.backend.submission.service;

import org.springframework.stereotype.Service;

import com.codequest.backend.submission.dto.SubmissionDto;
import com.codequest.backend.submission.repository.SubmissionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionDto createSubmission(SubmissionDto request) {

        // check if the submission passed all the testcases then save it in the database

    }

}
