package com.example.Cart.Repositories;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Cart.Entities.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	List<Cart> findAllByCategoryId(Integer categoryId);
	List<Cart> findAllBySubCategory(String id);
	Page<Cart> findByCategoryId(int category_id, PageRequest request);
//	Page<Cart> findAl(Pageable pageable);
	
	Page<Cart> findAllByCategoryId(Integer categoryId, Pageable pageable);
	Page<Cart> findAllBySubCategoryId(Integer subCategoryId, Pageable request);
	
	Page<Cart> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}

