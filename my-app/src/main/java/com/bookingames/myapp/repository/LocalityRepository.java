package com.bookingames.myapp.repository;

import com.bookingames.myapp.model.Locality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalityRepository extends JpaRepository<Locality, Long> {
}
