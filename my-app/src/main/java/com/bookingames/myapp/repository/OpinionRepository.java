package com.bookingames.myapp.repository;

import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    Optional<Opinion> findByUserAndRatedUser(AppUser user, AppUser ratedUser);
}
