package com.example.Cart.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Cart.Entities.Category;
import com.example.Cart.Repositories.CategoryRepository;


@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}
	
	public Category addCategory(Category category) {
		return categoryRepository.save(category);
	}
}
