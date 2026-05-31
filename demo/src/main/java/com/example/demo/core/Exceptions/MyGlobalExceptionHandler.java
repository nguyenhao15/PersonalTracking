package com.example.demo.core.Exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.InvalidPropertiesFormatException;
import java.util.Map;

@RestControllerAdvice
public class MyGlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse> myMethodArgumentNotValidException(MethodArgumentNotValidException e,
                                                                                 HttpServletRequest request) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(
                message,
                request.getRequestURI(),
                "Validation failed for one or more fields",
                HttpStatus.BAD_REQUEST.value()
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse> myResourceNotFoundException(ResourceNotFoundException e,
                                                                   HttpServletRequest request) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage(message);
        apiResponse.setPath(request.getRequestURI());
        apiResponse.setStatus(HttpStatus.NOT_FOUND.value());
        apiResponse.setError("Resource not found");
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(APIException.class)
    public ResponseEntity<APIResponse> APIException(APIException e,
                                                    HttpServletRequest request) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(
                message,
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                HttpStatus.BAD_REQUEST.value()
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<APIResponse> handleDuplicateResourceException(DuplicateResourceException e,
                                                                        HttpServletRequest request) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(
                message,
                request.getRequestURI(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                HttpStatus.CONFLICT.value()
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<APIResponse> handleInvalidCredentialsException(InvalidCredentialsException e,
                                                                         HttpServletRequest request) {
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(message, request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.getReasonPhrase(), HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<APIResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e,
                                                                             HttpServletRequest request) {
        APIResponse apiResponse = new APIResponse(
                "Malformed JSON request or invalid data type",
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                HttpStatus.BAD_REQUEST.value()
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    // 3. BỔ SUNG: Xử lý lỗi truyền sai kiểu dữ liệu trên URL (e.g., truyền chuỗi vào trường Long id)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<APIResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e,
                                                                                 HttpServletRequest request) {
        String message = String.format("Parameter '%s' expects a value of type '%s'", e.getName(), e.getRequiredType().getSimpleName());
        APIResponse apiResponse = new APIResponse(message, request.getRequestURI(), HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<APIResponse> handleMaxSizeException(MaxUploadSizeExceededException e,
                                                              HttpServletRequest request) {
        String message = "File size exceeds the maximum limit!";
        APIResponse apiResponse = new APIResponse(message, request.getRequestURI(), HttpStatus.CONTENT_TOO_LARGE.getReasonPhrase(), HttpStatus.CONTENT_TOO_LARGE.value());
        return new ResponseEntity<>(apiResponse, HttpStatus.CONTENT_TOO_LARGE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse> handleGlobalException(Exception e, HttpServletRequest request) {
        e.printStackTrace();

        APIResponse apiResponse = new APIResponse(
                e.getMessage(),
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler(InvalidPropertiesFormatException.class)
//    public ResponseEntity<APIResponse> handleInvalidPropertiesFormatException(InvalidPropertiesFormatException e) {
//        String message = e.getMessage();
//        APIResponse apiResponse = new APIResponse(message, false);
//        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
//    }

}
