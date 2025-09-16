package com.example.Cart.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Cart.Services.UserService;

@CrossOrigin
@RestController
public class AuthController {

	@Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        // Call the UserService to authenticate the user
        return userService.authenticateUser(user);
    }
}


