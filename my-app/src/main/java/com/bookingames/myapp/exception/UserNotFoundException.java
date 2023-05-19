package com.bookingames.myapp.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Nie znaleziono użytkowniaka o id: " +id);
    }
}
