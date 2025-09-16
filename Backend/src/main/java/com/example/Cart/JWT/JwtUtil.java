package com.example.Cart.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Generate a secure 256-bit key for HS256 algorithm
    private SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); 
    
    // Generate JWT token
    public String generateToken(String username) {
    	System.out.println("Token Generating");
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(secretKey) // Use the generated secretKey
                .compact();
    }

    // Validate JWT token
    public Boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    // Extract username from JWT token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extract claims from JWT token
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()  // Use parserBuilder for the latest API
                .setSigningKey(secretKey) // Use the generated secretKey
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
