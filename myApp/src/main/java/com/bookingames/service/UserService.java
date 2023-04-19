package com.bookingames.service;

import com.bookingames.database.AppUser;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void saveUser(AppUser user) {
        entityManager.persist(user);
    }
}

