package com.example.Cart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.Cart") // Ensures all packages within 'com.example' are scanned
public class CartApplication {

	public static void main(String[] args) {
		SpringApplication.run(CartApplication.class, args);
		System.out.print("Hello");
	}
}

