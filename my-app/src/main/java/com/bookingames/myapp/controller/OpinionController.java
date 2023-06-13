package com.bookingames.myapp.controller;

import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Game;
import com.bookingames.myapp.model.Opinion;
import com.bookingames.myapp.repository.AppUserRepository;
import com.bookingames.myapp.repository.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class OpinionController {
    @Autowired
    private OpinionRepository opinionRepository;
    @Autowired
    private AppUserRepository appUserRepository;

    @GetMapping("/opinions")
    List<Opinion> getAllOpinions() {
        return opinionRepository.findAll();
    }
    @GetMapping("/opinions/user/{id}")
    List<Opinion> getOpinionsByRatedUserId(@PathVariable Long id) {
        AppUser userRated = appUserRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o id: " + id));

        return opinionRepository.findByRatedUser(userRated);
    }
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

    @PutMapping("/opinion/{opinionId}/{rating}/{comment}")
    public Opinion editOpinion(
            @PathVariable("opinionId") Long opinionId,
            @PathVariable("rating") int rating,
            @PathVariable("comment") String comment
    ) {
        Opinion opinion = opinionRepository.findById(opinionId).orElseThrow(() -> new NotFoundException("Nie znaleziono opinii o id: " + opinionId));

        opinion.setRating(rating);
        opinion.setComment(comment);
        opinionRepository.save(opinion);

        return opinion;
    }

    @DeleteMapping("/opinion/{commentId}")
    public void deleteOpinion(@PathVariable("commentId") Long commentId) {
        opinionRepository.deleteById(commentId);
    }
}
