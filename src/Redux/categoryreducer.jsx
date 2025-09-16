import { GET_CATEGORY_DATA_SUCCESS } from "./allconstant";

const init = { 
    data:[], 
    subCategories:[]}

export const categoryData = (state = init, action) =>{
    console.log("category in reducer........", action.data);


    switch (action.type) {
        case GET_CATEGORY_DATA_SUCCESS:
            return{
                ...state, data:action.data
            };

        // case GET_SUBCATEGORIES_DATA:
        //     return{
        //         ...state, subCategories:action.payload
        //     };
        
    
        default:
            return state;
    }
}