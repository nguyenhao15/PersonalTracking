package com.haro._5.exceptions;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
}
