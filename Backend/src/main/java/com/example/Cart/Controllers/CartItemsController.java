package com.example.Cart.Controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.Cart.Entities.Cart;
import com.example.Cart.Entities.CartItems;
import com.example.Cart.Repositories.CartItemsRepository;
import com.example.Cart.Repositories.CartRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
 
public class CartItemsController {
	@Autowired
	CartItemsRepository cartItemsRepo;

	@Autowired
	public CartRepository cartRepo;

	// localhost:8080/get/cartItems
	@GetMapping("/get/cartItems")
	public List<CartItems> getAllcards() {
		return cartItemsRepo.findAll();
	}

	// localhost:8080/cartItems/details/1
	@GetMapping("/cartItems/details/{id}")
	public CartItems getcard(@PathVariable int id) {
		CartItems card = cartItemsRepo.findById((int) id).get();
		return card;
	}

//	localhost:8080/cartItems/card/add
	@PostMapping("/cartItems/card/add")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<String> createCart(@RequestBody Cart cart) {
		
		Optional<CartItems> c = cartItemsRepo.findByCartId(cart.getId());
		Optional<Cart> cat = cartRepo.findById(cart.getId());
 
		// Check if both cart and cart items are present
		if (c.isPresent() && cat.isPresent()) {
			Cart CART = cat.get();
			CartItems car = c.get();
			
			// Process the existing cart items
			car.setQuantity(car.getQuantity() + 1);
			CART.setNumberOfItems(CART.getNumberOfItems() - 1);
					
			cartItemsRepo.save(car);
			cartRepo.save(CART);
									
			return ResponseEntity.ok("Done");
		} else {
			// If no existing cart item, create a new one  
			if (cat.isPresent()) { 
				Cart cartEntity = cat.get();
				CartItems items = new CartItems();	

				items.setCart(cartEntity);
				items.setQuantity(1); // set initial quantity to 1
				cartItemsRepo.save(items);

				// Update the cart's number of items
				cartEntity.setNumberOfItems(cartEntity.getNumberOfItems() - 1);
				cartRepo.save(cartEntity);

				return ResponseEntity.ok("Inserted");
			} else {
				// If cart doesn't exist, handle this case, perhaps with an error response
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Card not found on home page");
			}
		}
	}
	

	@PostMapping("/cartItems/card/minus")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<String> minusCart(@RequestBody int cart) throws IOException {
		Optional<CartItems> c = cartItemsRepo.findByCartId(cart);
		Optional<Cart> cat = cartRepo.findById(cart);

		// Check if both cart and cart items are present
		if (c.isPresent() && cat.isPresent()) {
			Cart CART = cat.get();
			CartItems car = c.get();

			// Process the existing cart items
			car.setQuantity(car.getQuantity() - 1);
			CART.setNumberOfItems(CART.getNumberOfItems() + 1);

			cartItemsRepo.save(car);
			cartRepo.save(CART);

			return ResponseEntity.ok("Done");
		} else {
			// If no existing cart item, create a new one
			if (cat.isPresent()) {
				Cart cartEntity = cat.get();
				CartItems items = new CartItems();

				items.setCart(cartEntity);
				items.setQuantity(1); // set initial quantity to 1
				cartItemsRepo.save(items);

				// Update the cart's number of items
				cartEntity.setNumberOfItems(cartEntity.getNumberOfItems() - 1);
				cartRepo.save(cartEntity);

				return ResponseEntity.ok("Inserted");
			} else {
				// If cart doesn't exist, handle this case, perhaps with an error response
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found");
			}
		}
	}

	// localhost:8080/cartItems/update/1
	@PutMapping("/cartItems/update/{id}")
	public ResponseEntity<String> updateCart(@PathVariable int id, @RequestParam("title") String title,
			@RequestParam("description") String description, @RequestParam("price") String price,
			@RequestParam("numberOfItems") int numberOfItems) throws IOException {
		Optional<CartItems> card = cartItemsRepo.findById((int) id);
		if (card.isPresent()) {
			CartItems card1 = card.get();
//				card1.setTitle(title);
//				card1.setDescription(description);
//				card1.setPrice(price);
//				card1.setNumberOfItems(numberOfItems);

			cartItemsRepo.save(card1);

		}
		return ResponseEntity.ok("Inserted");
	}

	// localhost:8080/cartItems/card/delete/1
	@DeleteMapping("/cartItems/card/delete/{id}")
	public void removeCard(@PathVariable int id) {

		System.out.println(id);
		Optional<CartItems> card = cartItemsRepo.findById(id);

		CartItems caaaa = card.get();
		Cart ca = caaaa.getCart();
		Optional<Cart> caaa = cartRepo.findById(ca.getId());
		Cart as = caaa.get();
		System.out.println(as.getNumberOfItems());

		if (card.isPresent()) {
			if (caaa.isPresent()) {
				as.setNumberOfItems(as.getNumberOfItems() + caaaa.getQuantity());
				cartRepo.save(as);
			}
			cartItemsRepo.delete(caaaa);
		}
	}
}
