package com.example.Cart.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Cart.JWT.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);  // Method to find a user by username
}

