import { SET_PRODUCT_LIST } from "./allconstant";

const initial = {
    items: [],
    cartItems: [],
    category: [],
    subCategory: [],
    totalPages: 0,
    page: 0,
    size: 4,
    loading: false,
};

const productData = (state = initial, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            return {
                ...state,
                items:
                    action.page === 0
                        ? action.data
                        : Array.from(
                            new Map(
                                [...state.items, ...action.data].map(item => [item.id, item])
                            ).values()
                        ),
                page: action.page,
                totalPages: action.totalPages,
            };

        case "SET_RESPONSE":
            return { ...state, totalPages: action.data.totalPages };

        case "Get_Data":
            return { ...state, cartItems: action.data };

        case "GET_CATEGORY":   
            // console.log("category..........",action.items);
            return {...state, category: action.items};
        
        case "CATEGORY_SUCCESS":
            return { ...state, category: action.payload || action.items };

        case "GET_SUBCATEGORY":
            // console.log("action..",action)
            return { ...state, subCategory: action.payload };

        default:
            return state;
    }
};

export default productData;






























// import { SET_PRODUCT_LIST } from "./allconstant";
// const initial={
//     items:[],
//      cartItems:[],
//       category: [],
//        subCategory:[],
//         totalPages:[],
//         page:0,
//         size:4
//     }

// const productData = (state = initial, action) => {
//     console.log("reducer", action);
//     switch (action.type) {

//         case SET_PRODUCT_LIST:
//             if (state.items.length === 0) {
//                 return {
//                   ...state,
//                   items: action.data.content, // First load (no duplicates)

//                   loading: false,
//                 };
//               } else {
//                 return {
//                   ...state,
//                   items: [
//                     ...new Map([
//                       ...state.items, // Existing data
//                       ...action.data.content, // New data
//                     ].map(item => [item.id, item])) // Deduplicate using 'id'
//                     .values(),
//                   ],
//                   loading: false,
//                 };
//               }

//         case "SET_RESPONSE":
//             return {...state, totalPages:action.response.data.totalPages}

//         case "Get_Data":
//             return {...state, cartItems:action.data};

//         case "GET_CATEGORY":
//                         console.log("category..........",action);
//             return {...state, category: action.payload};

//         case "CATEGORY_SUCCESS":
//             console.log("category..........",action.items);
//             return {...state, items:action.items}

//         case "GET_SUBCATEGORY":
//             console.log("SubCategories are inside reducer: ", action.payload);
//             return{...state, subCategory:action.payload}
        
//         default:
//             return state;
//     }
// };

// export default productData;
