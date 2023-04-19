package com.bookingames.controller;

import com.bookingames.model.AppUser;
import com.bookingames.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegistrationController {

    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new AppUser());
        return "registration";
    }

    @PostMapping("/register")
    public String processRegistrationForm(@ModelAttribute("user") AppUser user, BindingResult result) {
        if (result.hasErrors()) {
            return "registration";
        }
        userService.save(user);
        return "redirect:/login?registrationSuccess";
    }
}

