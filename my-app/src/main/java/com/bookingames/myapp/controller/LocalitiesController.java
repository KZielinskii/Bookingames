package com.bookingames.myapp.controller;

import com.bookingames.myapp.exception.NotFoundException;
import com.bookingames.myapp.model.Locality;
import com.bookingames.myapp.repository.LocalityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class LocalitiesController {
    @Autowired
    private LocalityRepository localityRepository;
    @PostMapping("/locality")
    Locality newLocality(@RequestBody Locality locality)
    {
        return localityRepository.save(locality);
    }
    @GetMapping("/localities")
    List<Locality> getAllLocalities()
    {
        return localityRepository.findAll();
    }
    @GetMapping("/locality/{id}")
    Locality getLocalityById(@PathVariable Long id) {
        return localityRepository.findById(id).orElseThrow(()->new NotFoundException("Nie znaleziono miejscowości o id: " +id));
    }
    @DeleteMapping("/locality/{id}")
    String deleteLocality(@PathVariable Long id){
        if(!localityRepository.existsById(id))
        {
            throw new NotFoundException("Nie znaleziono miejscowości o id: " +id);
        }
        localityRepository.deleteById(id);
        return "Miejscowść o id: " + id + " została usunięta.";
    }
}
