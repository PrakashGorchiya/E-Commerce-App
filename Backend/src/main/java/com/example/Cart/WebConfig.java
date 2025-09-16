package com.example.Cart;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")  // Allow your frontend
                .allowedMethods("GET", "POST", "DELETE", "PUT")  // Allowed HTTP methods
                .allowCredentials(true);
    }
}