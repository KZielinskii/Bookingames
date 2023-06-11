package com.bookingames.myapp.controller;
import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
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

    @GetMapping("/user/{id}")
    AppUser getUserById(@PathVariable Long id) {
        return appUserRepository.findById(id).orElseThrow(()->new NotFoundException("Nie znaleziono użytkowniaka o id: " +id));
    }

    @GetMapping("/username/{username}")
    AppUser getUserByUsername(@PathVariable String username) {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o username: " + username));
    }

    @GetMapping("/email/{email}")
    AppUser getUserByEmail(@PathVariable String email) {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o username: " + email));
    }

    @PutMapping("/user/{id}")
    AppUser updateUser(@RequestBody AppUser newUser,@PathVariable Long id) {
        return appUserRepository.findById(id).map(user ->{
            user.setUsername(newUser.getUsername());
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            user.setUsertype(newUser.getUsertype());
            return appUserRepository.save(user);
        }).orElseThrow(()->new NotFoundException("Nie znaleziono użytkowniaka o id: " +id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!appUserRepository.existsById(id))
        {
            throw new NotFoundException("Nie znaleziono użytkowniaka o id: " +id);
        }
        appUserRepository.deleteById(id);
        return "Użytkownik o id: " + id + " został usunięty.";
    }
}
