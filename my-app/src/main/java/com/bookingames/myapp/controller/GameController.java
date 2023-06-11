package com.bookingames.myapp.controller;

import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Game;
import com.bookingames.myapp.model.Locality;
import com.bookingames.myapp.repository.AppUserRepository;
import com.bookingames.myapp.repository.GameRepository;
import com.bookingames.myapp.repository.LocalityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class GameController {
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private LocalityRepository localityRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @PostMapping("/game")
    Game newGame(@RequestBody Game game) {
        Long localityId = game.getTransferredLocationId();
        Locality locality = localityRepository.findById(localityId)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono lokalizacji o id: " + localityId));
        game.setLocality(locality);
        Long userId = game.getTransferredUserId();
        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o id: " + userId));
        game.setAppUser(appUser);
        return gameRepository.save(game);
    }
    @PutMapping("/game/{gameId}/addUser/{userId}")
    Game addUserToGame(@PathVariable Long gameId, @PathVariable Long userId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono gry o id: " + gameId));

        if (game.getOccupied() >= game.getCapacity()) {
            throw new RuntimeException("Gra jest już pełna.");
        }

        List<AppUser> appUsers = game.getAppUsers();
        boolean userExists = appUsers.stream().anyMatch(user -> user.getId().equals(userId));
        if (userExists) {
            throw new RuntimeException("Użytkownik o podanym id jest już na liście.");
        }

        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono użytkownika o id: " + userId));

        appUsers.add(appUser);
        game.setOccupied(game.getOccupied() + 1);
        return gameRepository.save(game);
    }
    @GetMapping("/games")
    List<Game> getAllGames()
    {
        return gameRepository.findAll();
    }
    @GetMapping("/game/{id}")
    Game getGameById(@PathVariable Long id) {
        return gameRepository.findById(id).orElseThrow(()->new NotFoundException("Nie znaleziono gry o id: " +id));
    }
    @PutMapping("/game/{id}")
    Game updateGame(@RequestBody Game newGame, @PathVariable Long id) {
        return gameRepository.findById(id).map(game ->{
            game.setName(newGame.getName());
            game.setCapacity(newGame.getCapacity());
            game.setOccupied(newGame.getOccupied());
            game.setDatetime(newGame.getDatetime());
            game.setTransferredLocationId(newGame.getTransferredLocationId());
            Long localityId = game.getTransferredLocationId();
            Locality locality = localityRepository.findById(localityId)
                    .orElseThrow(() -> new NotFoundException("Nie znaleziono lokalizacji o id: " + localityId));
            game.setLocality(locality);
            game.setLevel(newGame.getLevel());
            return gameRepository.save(game);
        }).orElseThrow(()->new NotFoundException("Nie znaleziono gry o id: " +id));
    }
    @DeleteMapping("/game/{id}")
    String deleteGame(@PathVariable Long id){
        if(!gameRepository.existsById(id))
        {
            throw new NotFoundException("Nie znaleziono gry o id: " +id);
        }
        gameRepository.deleteById(id);
        return "Gra o id: " + id + " została usunięta.";
    }
}
