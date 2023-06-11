package com.bookingames.myapp.controller;

import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Game;
import com.bookingames.myapp.model.Locality;
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
    @PostMapping("/game")
    Game newGame(@RequestBody Game game) {
        Long localityId = game.getTransferredId();
        Locality locality = localityRepository.findById(localityId)
                .orElseThrow(() -> new NotFoundException("Nie znaleziono lokalizacji o id: " + localityId));
        game.setLocality(locality);
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
            game.setTransferredId(newGame.getTransferredId());
            Long localityId = game.getTransferredId();
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
