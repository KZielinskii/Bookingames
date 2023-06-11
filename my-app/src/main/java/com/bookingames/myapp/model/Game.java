package com.bookingames.myapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

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
    private Level level;
    @ManyToOne
    private Locality locality;
    @ManyToOne
    private AppUser appUser;
    private Long transferredLocationId;
    private Long transferredUserId;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "game_app_user",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "app_user_id"))
    private List<AppUser> appUsers;
}

