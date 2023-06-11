package com.bookingames.myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Locality {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}
