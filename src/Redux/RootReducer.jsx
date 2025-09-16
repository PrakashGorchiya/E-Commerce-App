import {combineReducers} from 'redux';
// import {cartData} from './reducer';
import productData from './reducer';
import { categoryData } from './categoryreducer';

 
 
 
export default combineReducers({
    productData,
    categoryData
 
})
 