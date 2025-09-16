package com.example.Cart.Controllers;

import java.io.IOException;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Cart.Entities.Cart;
import com.example.Cart.Entities.Category;
import com.example.Cart.Entities.SubCategory;
import com.example.Cart.Repositories.CartRepository;
import com.example.Cart.Repositories.CategoryRepository;
import com.example.Cart.Repositories.SubCategoryRepository;
import com.example.Cart.Services.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/card")
public class CartController {
	
	@Autowired
	public CartService cartService;
	
	@Autowired
	CartRepository repo;
	
	@Autowired
	CategoryRepository categoryRepo;

	@Autowired
	SubCategoryRepository subCategoryRepo;
	
	// http://localhost:8080/card/get?page=0&size=4
	@GetMapping("/get")
	public Page<Cart> getAllCards(
            @RequestParam(defaultValue="0") int page, 
            @RequestParam(defaultValue="4") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Cart> cardPage = repo.findAll(pageable);
      
        return cardPage;
    }
	// localhost:8080/card/cartItems/1
	@GetMapping("/cartItems/{id}")
	public Cart getcard(@PathVariable int id) {
		Cart card = repo.findById(id).get();
		return card;
	}

	// localhost:8080/card/add
	@PostMapping("/add")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<String> createCart(@RequestParam("title") String title,
			@RequestParam("price") String price,
			@RequestParam("numberOfItems") int numberOfItems,
			@RequestParam("description") String description,
			@RequestParam("image") MultipartFile image,
			@RequestParam("category") int categoryId, 
			@RequestParam("subCategory") int subCategoryId) throws IOException {
		Cart card = new Cart();
		card.setTitle(title);
		card.setDescription(description);
		card.setPrice(price);
		card.setNumberOfItems(numberOfItems);
	    
		
		card.setImgName(image.getOriginalFilename());
		card.setImgType(image.getContentType());
		card.setImage(image.getBytes());
		
		Optional<Category> categoryOptional = categoryRepo.findById(categoryId);
		if(categoryOptional.isPresent()) {
			Category category = categoryOptional.get();
			card.setCategory(category);
		}
		
		Optional<SubCategory> subCategoryOptional = subCategoryRepo.findById(subCategoryId);
		if(subCategoryOptional.isPresent()) {
			SubCategory subCategory = subCategoryOptional.get();
			card.setSubCategory(subCategory);
		}
		
//		card.setSubCategory(subCategory);

		repo.save(card);
		return ResponseEntity.ok("Inserted");
	}

	// localhost:8080/card/cart/update/1
	@PutMapping("/cart/update/{id}")
	public ResponseEntity<String> updateCart(@PathVariable int id, @RequestParam("title") String title,
			@RequestParam("description") String description, @RequestParam("price") String price,
			@RequestParam("numberOfItems") int numberOfItems, @RequestParam("image") MultipartFile image)
			throws IOException {
		Optional<Cart> card = repo.findById(id);

		if (card.isPresent()) {
			Cart card1 = card.get();
			card1.setTitle(title);
			card1.setDescription(description);
			card1.setPrice(price);
			card1.setNumberOfItems(numberOfItems);
			card1.setImgName(image.getOriginalFilename());
			card1.setImgType(image.getContentType());
			card1.setImage(image.getBytes());
			repo.save(card1);

		}
		return ResponseEntity.ok("Inserted");
	}

	// localhost:8080/card/cart/updateStock/1
	@PutMapping("/cart/updateStock/{id}")
	public ResponseEntity<String> updateStockQuantity(@PathVariable int id,
			@RequestParam("numberOfItems") int numberOfItems) throws IOException {
		Optional<Cart> card = repo.findById(id);

		if (card.isPresent()) {
			Cart card1 = card.get();
			card1.setNumberOfItems(numberOfItems);
			repo.save(card1);
		}
		return ResponseEntity.ok("Stock Updated");
	}

	// localhost:8080/card/delete/1
	@DeleteMapping("/delete/{id}")
	public void removeCard(@PathVariable int id) {
		Cart card = repo.findById(id).get();
		repo.delete(card);
	}
	
	@GetMapping("/getItemsByCategory")
	public Page<Cart> getItemsByCategory(@RequestParam Integer categoryId,@RequestParam(defaultValue="0") int page, 
            @RequestParam(defaultValue="4") int size){
		
		 // Create Pageable object from page and size
        Pageable pageable = PageRequest.of(page, size);

        // Fetch paginated data from the repository
        // Page<Cart> cardPage = repo.findAll(pageable);
		
		System.out.println("Cate..."+categoryId);
		Page<Cart> cardPage= repo.findAllByCategoryId(categoryId, pageable);
		return cardPage;
	}
	
	@GetMapping("/getItemsBySubCategory")
	public Page<Cart> getItemsBySubCategory(@RequestParam Integer subCategoryId, @RequestParam(defaultValue="0") int page, 
            @RequestParam(defaultValue="4") int size){
		
		 // Create Pageable object from page and size
        Pageable pageable = PageRequest.of(page, size);

        // Fetch paginated data from the repository
        // Page<Cart> cardPage = repo.findAll(pageable);
		
		System.out.println("Cate..."+subCategoryId);
		Page<Cart> cardPage= repo.findAllBySubCategoryId(subCategoryId, pageable);
		return cardPage;
	}
	
	// search
		@GetMapping("/getDataByTitle")
		public Page<Cart> getItemByName(@RequestParam(required = false) String title,
				@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
	 
			return cartService.getProductsBySearch(title, page, size);
	 
		}

}
