package com.haro._5.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String error;
    private String path;
    private LocalDateTime time;
    private Map<String, String> details;

    public ErrorResponse(int status, String error, String path) {
        this.status = status;
        this.error = error;
        this.path = path;
        this.time = LocalDateTime.now();
    }

    public ErrorResponse(int status, String error, String path, Map<String, String> details) {
        this(status, error, path);
        this.details = details;
    }

}
