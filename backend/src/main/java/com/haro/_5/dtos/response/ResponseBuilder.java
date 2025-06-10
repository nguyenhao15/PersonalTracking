package com.haro._5.dtos.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseBuilder {

    public <T> ResponseEntity<ApiResponse<T>> success(T data, String message) {
        ApiResponse<T> response = new ApiResponse<>(HttpStatus.OK.value(), message, data);
        return ResponseEntity.ok(response);
    }

    public <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        ApiResponse<T> response = new ApiResponse<>(HttpStatus.CREATED.value(), message, data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public ResponseEntity<ApiResponse<Object>> errorMessage(String message) {
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), message, null);
        return ResponseEntity.ok(response);
    }


}
