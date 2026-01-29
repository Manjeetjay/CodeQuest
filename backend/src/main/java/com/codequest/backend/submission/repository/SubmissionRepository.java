package com.codequest.backend.submission.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codequest.backend.submission.model.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Optional<Submission> findByProblemIdAndEmail(Long problemId, String email);

    List<Submission> findByEmail(String email);

    List<Submission> findByProblemIdAndEmailOrderByCreatedAtDesc(Long problemId, String email);
}
