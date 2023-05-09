package com.bookingames.myapp.controller;

import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppUserController {
    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/user")
    AppUser newUser(@RequestBody AppUser newUser)
    {
        return appUserRepository.save(newUser);
    }

    @GetMapping("/users")
    List<AppUser> getAllUsers()
    {
        return appUserRepository.findAll();
    }
}
