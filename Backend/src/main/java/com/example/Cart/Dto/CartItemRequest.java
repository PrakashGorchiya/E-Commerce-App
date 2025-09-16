package com.example.Cart.Dto;

public class CartItemRequest {
    private int cartId;
    private int quantity;
    private String user;
    
    public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public CartItemRequest() {
    	
    }
    
	public CartItemRequest(int cartId, int quantity) {
		super();
		this.cartId = cartId;
		this.quantity = quantity;
	}
	public CartItemRequest(int cartId, int quantity, String user) {
		super();
		this.cartId = cartId;
		this.quantity = quantity;
		this.user = user;
	}

	public int getCartId() {
		return cartId;
	}
	public void setCartId(int cartId) {
		this.cartId = cartId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

    
}

