package com.codequest.backend.auth.exception;

public class InvalidEmailException extends RuntimeException {

    private final String reason;

    public InvalidEmailException(String message, String reason) {
        super(message);
        this.reason = reason;
    }

    public InvalidEmailException(String message) {
        super(message);
        this.reason = "unknown";
    }

    public String getReason() {
        return reason;
    }
}
