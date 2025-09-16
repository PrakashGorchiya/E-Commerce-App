package com.example.Cart.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.Cart.Entities.Cart;
import com.example.Cart.Repositories.CartRepository;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getAllCards() {
        return cartRepository.findAll();
        
    
    }
    
  //search service
  	public Page<Cart> getProductsBySearch(String title,int page,int size) {
  		PageRequest request = PageRequest.of(page, size);
  		Page<Cart> cardItems = cartRepository.findByTitleContainingIgnoreCase(title,request);
  		// Page<CardItem> cardItems1 = selectedItemService.findBySubCategoryId(categoryId,request);
          return cardItems;
      }
}











//package com.example.services;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import com.example.Cart.CartRepository;
//import com.example.Cart.entity.Cart;
//
//import java.util.List;
//
////@Component
//@Service
//public class CartService {
//	
//	@Autowired
//    CartRepository cartRepository;
//	
////	@Autowired
////	CartService cartService;
//
//    public List<Cart> getAllCards() {
//        return cartRepository.findAllOrderByCreatedAtDesc();
//    }
//
//    // Other service methods
//}
