import { combineReducers } from 'redux';

import { burgerConstructorReducer } from "./BurgerConstructor";
import { burgerIngredientsReducer } from './BurgerIngredients';
import { loginReducer } from './Login';
import { modalReducer } from "./Modal"
import { orderDetailsReducer } from './OrderDetails';
import { profileReducer } from './Profile';
import { registerReducer } from './Register';
import { resetPasswordReducer } from './ResetPassword';
import { wsFeedReducer } from './wsFeed';
import { wsProfileOrdersReducer } from './wsProfileOrders';

export const rootReducer = combineReducers({
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  reset: resetPasswordReducer,
  burgerIngredients: burgerIngredientsReducer,
  modal: modalReducer,
  feed: wsFeedReducer,
  profileOrders: wsProfileOrdersReducer,
});