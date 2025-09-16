import { applyMiddleware, createStore } from 'redux'
import { productSaga } from './saga';
import createSagaMiddleware from 'redux-saga'
import RootReducer from './RootReducer';
import productData from './reducer';
 
 
const sagaMiddleware=createSagaMiddleware();
const store=createStore(productData, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(productSaga);  
 
 export default store;
