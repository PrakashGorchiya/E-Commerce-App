package com.example.Cart.Entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.Cart.JWT.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table

public class CartItems {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name="cartid" , referencedColumnName="id")
//	@JsonIgnore
	private Cart cart;
	
	 // Create a many-to-one relationship with the User table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")     // Foreign key in Cart table
    
    @JsonIgnore
    
    private Users user;
	      
	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}
}