package com.example.Cart.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Cart.Entities.CartItems;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Integer> {
	Optional<CartItems> findByCartId(int cart);
	
	
	
}

