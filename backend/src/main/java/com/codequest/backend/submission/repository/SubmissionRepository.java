package com.codequest.backend.submission.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codequest.backend.submission.model.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Optional<Submission> findByProblemIdAndEmail(Long problemId, String email);
}
