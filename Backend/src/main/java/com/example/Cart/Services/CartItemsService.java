package com.example.Cart.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Cart.Entities.Cart;
import com.example.Cart.Entities.CartItems;
import com.example.Cart.JWT.Users;
import com.example.Cart.Repositories.CartItemsRepository;
import com.example.Cart.Repositories.CartRepository;
import com.example.Cart.Repositories.UserRepository;

@Service
public class CartItemsService {
	@Autowired
	private CartItemsRepository cartItemsRepository;

	@Autowired
	private UserRepository userRepository; // Repository for User (LoginRequest) entity

	@Autowired
	private CartRepository cartRepository; // Repository for Cart entity

	public List<CartItems> getAllCards() {
	        return cartItemsRepository.findAll();
	}	        
	
	public CartItems addCartItem(int cartId, int quantity, Long userId) {
	    // Retrieve the Cart and User based on their IDs
	    Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
	    Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

	    // Create a new CartItems object
	    CartItems cartItem = new CartItems();
	    cartItem.setQuantity(quantity);
	    cartItem.setCart(cart); // Set the cart associated with this item
	    cartItem.setUser(user); // Set the user who is adding this item to the cart

	    // Save the CartItems object in the database
	    return cartItemsRepository.save(cartItem);
	}

}
