package com.codequest.backend.problems.exception;

public class ProblemNotFoundException extends RuntimeException {
    public ProblemNotFoundException(Long id) {
        super("Problem not found with id: " + id);
    }

    public ProblemNotFoundException(String message) {
        super(message);
    }
}
