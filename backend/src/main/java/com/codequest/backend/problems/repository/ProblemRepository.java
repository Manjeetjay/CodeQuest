package com.codequest.backend.problems.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codequest.backend.problems.model.Problem;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    Optional<Problem> findById(Long id);

    boolean existsByTitle(String title);

}
