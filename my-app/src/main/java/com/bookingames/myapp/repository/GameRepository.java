package com.bookingames.myapp.repository;

import com.bookingames.myapp.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
