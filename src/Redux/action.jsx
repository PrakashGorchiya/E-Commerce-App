import { use } from "react";
import { ADD_TO_CART, CREATE_NEW_PRODUCT, DELETE_CART_ITEM, DELETE_PRODUCT, PRODUCT_LIST } from "./allconstant"

export const productList = (page, size) => {
    //  console.log("Action called of geting cartsItems", page, size);
    return {
        type: PRODUCT_LIST, 
        payload: {page, size}
    }
}

// User
export const cartList = (page, size) => {
    return {
        type: "GET_DATA",
        payload: (page, size)
    }
}

// action.js
export const addToCartAction = (formDataObject, user) => {
    // console.log("add to cart data is: ", formDataObject, user)
    return {
        type: ADD_TO_CART,
        payload: formDataObject, user
    };
};
  
export const updateProduct = (id, product) => {
    // console.log("Card data is: ", product);
    return {
        type: 'UPDATE_PRODUCT',
        payload: {id,product},
    };
};

export const createNewProduct = (formData) =>{
    // console.log("Formdata is: ", formData);
    return {
        type: CREATE_NEW_PRODUCT,
        payload: formData
    }
}

export const deleteCartItem = (id ) =>{
    return{
        type: DELETE_CART_ITEM,
        payload: id
    }
}

export const deleteProduct = (id) =>{
    return{
        type: DELETE_PRODUCT,
        payload: id
    }
}

export const minusQuantityAction = (id) => {
    return{
        type: "MINUS_QUANTITY",
        payload: id
    }
}

export const updateStock = (id, stockQuantity) =>{
    return{
        type: "UPDATE_STOCK",
        payload: {id, stockQuantity}
    }
}

export const getCategory = () =>{
    return{
        type: "CATEGORY",
    }
}

export const getCategorySuccess = (items) =>{
    return{
        type: "GET_CATEGORY",
        items,
    }
}


export const getSubCategoriesByCategoryId = (id) =>{
    // console.log("id in action for subCategory",id);
    return{
        type: "SUBCATEGORY",
        payload:id
    }
}

export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});

export const getItemsByCategory = (categoryId, page, size) => {
    return{
    type: "GET_ITEMS_BY_CATEGORY",
    payload: {categoryId, page, size}
    }
};

export const getItemsBySubCategory = (subCategoryId, page, size) => ({
    type: "GET_ITEMS_BY_SUB_CATEGORY",
    payload: {subCategoryId, page, size}
});

export const getItemsByTitleName = (title, page, size) => ({
    type:"GET_ITEMS_BY_TITLE_NAME",
    payload:{title, page, size} 
});

