import { takeEvery, put } from "redux-saga/effects";
import { ADD_TO_CART, CREATE_NEW_PRODUCT, DELETE_CART_ITEM, DELETE_PRODUCT, PRODUCT_LIST, SET_PRODUCT_LIST, UPDATE_PRODUCT } from "./allconstant";
import axios from "axios";
import {cartList, getCategorySuccess, productList} from "./action"

function* getProductData(action) {
    // console.log("Saga for getting Home page product list", action);

    try {
        const response = yield axios.get(`http://localhost:8080/card/get?page=${action.payload.page}&size=${action.payload.size}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = response.data.content;
        const totalPages = response.data.totalPages;  // Get totalPages from the response
        // console.log("Response in saga: ", data);
        // console.log("Total Pages in response: ", totalPages);

        // Dispatch the data and totalPages together
        yield put({ type: "SET_PRODUCT_LIST", data, totalPages, page: action.payload.page });

    } catch (error) {
        console.error("Error fetching product data: ", error);
    }
}


function* getCategory() {
    try {
        const response = yield axios.get("http://localhost:8080/get/categories",{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = response.data;
        // console.log("saga called",data);
        yield put(getCategorySuccess(data));
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }
}

function* getItemsByCategory(action) {
    try {
        const { categoryId, page = 0, size = 4 } = action.payload;

        const response = yield axios.get("http://localhost:8080/card/getItemsByCategory", {
            params: { categoryId, page, size },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

            // console.log('responseresponseresponse',response);
        const data = response.data.content;
        const totalPages = response.data.totalPages;
        console.log("totalPages",totalPages);
        yield put({ type: "SET_PRODUCT_LIST", data, page, totalPages });

    } catch (error) {
        console.error("Error fetching items by category: ", error);
    }
}

function* getItemsBySubCategory(action) {
    try {
        const { subCategoryId, page = 0, size = 4 } = action.payload;

        const response = yield axios.get("http://localhost:8080/card/getItemsBySubCategory", {
            params: { subCategoryId, page, size },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = response.data.content;
        const totalPages = response.data.totalPages;

        yield put({ type: "SET_PRODUCT_LIST", data, page, totalPages });

    } catch (error) {
        console.error("Error fetching items by subcategory: ", error);
    }
}

function* getSubCategoriesByCategoryId(action){
    // console.log(action.payload);
    
    try {
        const response = yield axios.get(`http://localhost:8080/subcategories/category/${action.payload}`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        
        // console.log("SubCategories are inside saga: ", response.data);
        yield put({type: "GET_SUBCATEGORY", payload: response.data})
    } catch (error) {
        console.error("Error fetching subCategories: ", error)
    }
}

function* fetchItemsByTitleName(action){
        console.log(action);
    try {
        const { title, page, size  } = action.payload;

        const response = yield axios.get("http://localhost:8080/card/getDataByTitle" , {
            params: { title, page, size },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("response",response)
        const data = response.data.content;
        const totalPages = response.data.totalPages;
        
        yield put({ type: "SET_PRODUCT_LIST", data, page, totalPages });

    } catch (error) {
        console.error("Error fetching in cards by title name")
    }
}

function* getCartData(action)
{
    // console.log("Action:    ", action);
    
    const data = yield axios.get("http://localhost:8080/get/cartItems", {
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    });
    // console.log("Data inside saga",data);  
    yield put({ type: "Get_Data", data });
}
 
function* addToCart(action) {
    console.log("action for add to cart is :", action);    
      
    try {  
        const response = yield axios.post("http://localhost:8080/cartItems/card/add", action.payload , {
            headers: { 
                "Content-Type" : "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
        });
        
        // Dispatch the necessary actions after adding to cart
        yield put(cartList(0,4));   
        yield put(productList(0,4)); 

        // console.log("Item added to cart:", response.data);
    } catch (error) {
        console.error("Error Adding to Cart: ", error);
    }
}

function* updateProduct(action) {
    try {
        const { id, product } = action.payload;
        // console.log("update product is: ", product);
        const response = yield axios.put(`http://localhost:8080/card/cart/update/${id}`, product,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
    });
        console.log("Product updated successfully:", response.data);
    } catch (error) {
        console.error("Error Updating product: ", error);
    }
}

function* createNewProduct(action) {
    // console.log("Action.payload is: ", action.payload);
    try {
        yield axios.post("http://localhost:8080/card/add", action.payload, {
            headers: { "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
        },
        )
    } catch (error) {
        console.error("Error Creating card: ", error);
    }
}

function* deleteCartItem(action) {
    console.log(action.payload);
    
    if (window.confirm("Are you sure you want to delete this card?")) {
        // console.log("delteing Product id is(Action.payload is): ", action.payload);

        try {
            yield axios.delete(`http://localhost:8080/cartItems/card/delete/${action.payload}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            yield put(cartList());
        } catch (error) {
            console.error("Error deleting card from cart:", error);
        }
    }
}

function* deleteProduct(action) {
    if (window.confirm("Are you sure you want to delete this card?")) {
        try {
            yield axios.delete(`http://localhost:8080/card/delete/${action.payload}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            yield put(productList());
        }
        catch (error) {
            console.error("Error deleting card from home:", error);
        }
    }
}


function* minusQuantity(action){
    // console.log("Action", action);
    
    try {
        const response = yield axios.post("http://localhost:8080/cartItems/card/minus", action.payload,
         {
            headers: { "Content-Type": "application/json" ,
                       'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        yield put(cartList())
        yield put(productList())
        // console.log("Item minused to cart:", response.data);
    } catch (error) {
        console.error("Error when minus to Cart: ", error);
    }
}

function* updateStock(action){
    try {
        // console.log("Action.payload in updating stockQuantity is: ", action.payload);
        // console.log("Action.id is:",action.id );
        
        yield axios.put(`localhost:8080/card/cart/updateStock/${action.id}`, action.payload,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error("Error Updating in stockQuantity: ", error);
    }
}   

export function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProductData);
    yield takeEvery(ADD_TO_CART, addToCart);
    yield takeEvery(UPDATE_PRODUCT, updateProduct);
    yield takeEvery(CREATE_NEW_PRODUCT, createNewProduct);
    yield takeEvery(DELETE_CART_ITEM, deleteCartItem);
    yield takeEvery(DELETE_PRODUCT, deleteProduct);
    yield takeEvery("GET_DATA", getCartData);
    yield takeEvery("MINUS_QUANTITY", minusQuantity);
    yield takeEvery("UPDATE_STOCK", updateStock);
    yield takeEvery("CATEGORY", getCategory);
    yield takeEvery("SUBCATEGORY", getSubCategoriesByCategoryId);
    yield takeEvery("GET_ITEMS_BY_CATEGORY", getItemsByCategory);
    yield takeEvery("GET_ITEMS_BY_SUB_CATEGORY", getItemsBySubCategory);
    yield takeEvery("GET_ITEMS_BY_TITLE_NAME", fetchItemsByTitleName);
}


