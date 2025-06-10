package com.haro._5.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ApiResponse<T> {
    private  int status;
    private  String message;
    private  T data;
}
