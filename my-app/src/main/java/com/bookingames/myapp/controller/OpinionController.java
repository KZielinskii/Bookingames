package com.bookingames.myapp.controller;

import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Opinion;
import com.bookingames.myapp.repository.AppUserRepository;
import com.bookingames.myapp.repository.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class OpinionController {
    @Autowired
    private OpinionRepository opinionRepository;
    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/opinion/{opinion}/{text}/{idUser}/{idPlayer}")
    Opinion saveOpinion(
            @PathVariable("opinion") int opinion,
            @PathVariable("text") String text,
            @PathVariable("idUser") Long idUser,
            @PathVariable("idPlayer") Long idPlayer
    ) {
        AppUser userRated = appUserRepository.findById(idPlayer)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o id: " + idPlayer));
        AppUser user = appUserRepository.findById(idUser)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o id: " + idUser));

        Optional<Opinion> existingOpinion = opinionRepository.findByUserAndRatedUser(user, userRated);
        if (existingOpinion.isPresent()) {
            throw new IllegalStateException("Opinia została już wystawiona");
        }

        Opinion newOpinion = new Opinion();
        newOpinion.setRating(opinion);
        newOpinion.setComment(text);
        newOpinion.setRatedUser(userRated);
        newOpinion.setUser(user);

        opinionRepository.save(newOpinion);

        double averageRating = opinionRepository.calculateAverageRatingByRatedUser(userRated);
        int level = (int) (averageRating * 1000);
        userRated.setLevel(level);

        appUserRepository.save(userRated);

        return newOpinion;
    }
}
