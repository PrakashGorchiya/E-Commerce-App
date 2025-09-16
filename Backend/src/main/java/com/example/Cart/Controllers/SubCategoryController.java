package com.example.Cart.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.example.Cart.Entities.SubCategory;
import com.example.Cart.Services.SubCategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SubCategoryController {

	@Autowired
	private SubCategoryService subCategoryService;
	
	@GetMapping("/get/subCategories")
	public List<SubCategory> getAllSubCategories(){
		return subCategoryService.getAllSubCategories();
	}
	
	@GetMapping("/subcategories/category/{categoryId}")
    public ResponseEntity<List<SubCategory>> getSubcategoriesByCategoryId(@PathVariable int categoryId) {
        List<SubCategory> subcats = subCategoryService.getSubcatsByCategoryId(categoryId);
        if (subcats.isEmpty()) {
            return ResponseEntity.notFound().build();  // Return 404 if no subcategories found for the category
        }
        return ResponseEntity.ok(subcats);  // Return 200 OK with the list of subcategories
    }

}