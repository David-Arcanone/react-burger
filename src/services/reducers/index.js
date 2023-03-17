import { combineReducers } from 'redux';

import {burgerConstructorReducer} from "./BurgerConstructor";
//import { ingredientDetailsReducer } from './IngredientDetails';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { loginReducer } from './Login';
import {modalReducer} from "./Modal"
import { orderDetailsReducer } from './OrderDetails';
import { profileReducer } from './Profile';
import { registerReducer } from './Register';
import { resetPasswordReducer } from './ResetPassword';
//import {burgerConstructorReducer} from "./BurgerConstructor";



export const rootReducer = combineReducers({
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  reset: resetPasswordReducer,
  //ingredientDetails: ingredientDetailsReducer,
  burgerIngredients: burgerIngredientsReducer,
  modal: modalReducer
});