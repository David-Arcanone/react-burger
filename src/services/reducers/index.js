import { combineReducers } from 'redux';

import {burgerConstructorReducer} from "./BurgerConstructor";
import { ingredientDetailsReducer } from './IngredientDetails';
import { burgerIngredientsReducer } from './BurgerIngredients';
import {modalReducer} from "./Modal"
import { orderDetailsReducer } from './OrderDetails';
//import {burgerConstructorReducer} from "./BurgerConstructor";



export const rootReducer = combineReducers({
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerIngredients: burgerIngredientsReducer,
  modal: modalReducer
});