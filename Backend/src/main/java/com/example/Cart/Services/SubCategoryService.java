package com.example.Cart.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Cart.Entities.SubCategory;
import com.example.Cart.Repositories.SubCategoryRepository;

@Service
public class SubCategoryService {

	@Autowired
	SubCategoryRepository subCategoryRepository;
	
	//GetMapping Service
	public List<SubCategory> getAllSubCategories(){
		return subCategoryRepository.findAll();
	}
	
	public List<SubCategory> getSubcatsByCategoryId(int categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId);  // Fetch subcategories by category ID
    }
}


