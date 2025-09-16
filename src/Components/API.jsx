import axios from "axios";

const API_BASE_URL = "http://localhost:8080/card/get";

export const getcartAPI = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return setCards(response.data);
    } catch(error){
        return console.error("Error Fetching Cards:", error);
    }
}

export const getCartItemsAPI = async () => {
    try {
        const response = await axios.get("http://localhost:8080/get/cartItems");
        return setCards(response.data);
    } catch (error) {
        return console.error("Error Fetching Cards:", error);
    }
}

export const createNewItem = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8080/card/add", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error Creating card: ", error);
    }
}

export const addProductToCart = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8080/cartItems/card/add", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Item added to cart:", response.data);
        setCartItems([...cartItems, response.data]);
        return response.data;
    } catch (error) {
        console.error("Error Adding to Cart: ", error);
    }
}

export const deleteCardFromHome = () => {
    return axios.delete(`http://localhost:8080/card/delete/${id}`)
    .then(setApiDataItems(apiDataItems.filter(card => card.id !== id)))
    .then(setFilteredItems(filteredItems.filter(card => card.id !== id)))
    .then(window.alert("The card has been deleted"));
};

export const deleteCartProduct = (id) => {
    return axios.delete(`http://localhost:8080/cartItems/card/delete/${id}`)
    .then(setApiDataItems(apiDataItems.filter(card => card.id !== id)))
    .then(setFilteredItems(filteredItems.filter(card => card.id !== id)))
    .then(window.alert("The card has been deleted"));
}

export const updateItem = async (id, formData) => {
    try {
        const response = await axios
            .put(`http://localhost:8080/card/cart/update/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error Updating card: ", error);
        throw error;
    }
}