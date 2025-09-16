package com.example.Cart.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Cart.Entities.Category;
import com.example.Cart.Repositories.CartRepository;
import com.example.Cart.Services.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	public CartRepository cartRepo;
	
	@GetMapping("/get/categories")
	public List<Category> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@PostMapping("/post/category")
	public Category addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}
	
//	@GetMapping("/get/itemsBySubCategory")
//	public List<Cart> get(@RequestParam String id)
//	{
//		List<Cart> list = cartRepo.findAllBySubCategory(id);
//		return list;
//	}
}




