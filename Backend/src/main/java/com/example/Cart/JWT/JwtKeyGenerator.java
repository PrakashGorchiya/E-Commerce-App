package com.example.Cart.JWT;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.util.Base64;

public class JwtKeyGenerator {

    public static String generateSecretKey() { //Make it a method to return the key
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    public static void main(String[] args) {
        String secretString = generateSecretKey();
        System.out.println("Generated HS256 Secret Key (Base64 encoded):");
        System.out.println(secretString);
    }
}
