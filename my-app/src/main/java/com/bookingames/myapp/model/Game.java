package com.bookingames.myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Game {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int capacity;
    private int occupied;
    private LocalDateTime datetime;
    private Long transferredId;
    @ManyToOne
    private Locality locality;
    private Level level;
}

