package com.bookingames.myapp.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String text){
        super(text);
    }
}
