package com.bookingames.myapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Opinion {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private AppUser user;
    @ManyToOne
    private AppUser ratedUser;
    private int rating;
    private String comment;
}
