package com.codequest.backend.problems.exception;

public class DuplicateProblemException extends RuntimeException {
    public DuplicateProblemException(String title) {
        super("Problem already exists with title: " + title);
    }

    public DuplicateProblemException(String message, Throwable cause) {
        super(message, cause);
    }
}
