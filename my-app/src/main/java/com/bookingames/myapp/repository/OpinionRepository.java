package com.bookingames.myapp.repository;

import com.bookingames.myapp.model.AppUser;
import com.bookingames.myapp.model.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    Optional<Opinion> findByUserAndRatedUser(AppUser user, AppUser ratedUser);

    @Query("SELECT AVG(o.rating) FROM Opinion o WHERE o.ratedUser = ?1")
    Double calculateAverageRatingByRatedUser(AppUser ratedUser);

    List<Opinion> findByRatedUser(AppUser userRated);
}
