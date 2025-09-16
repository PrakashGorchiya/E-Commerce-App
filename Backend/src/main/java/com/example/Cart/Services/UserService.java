package com.example.Cart.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Cart.JWT.JwtUtil;
import com.example.Cart.JWT.Users;
import com.example.Cart.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String authenticateUser(Users loginRequest) {
        // Fetch user by username from the database
        Users user = userRepository.findByUsername(loginRequest.getUsername());

        // Check if the user exists and the password matches
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // Generate the JWT token for valid credentials
            return jwtUtil.generateToken(user.getUsername());
        }

        // Return an error message if the credentials are invalid
        return "Credentials not matched";
    }
}

