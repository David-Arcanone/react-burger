import { TBurgerConstructorActions } from "../actions/BurgerConstructor/BurgerConstructor";
import { TBurgerIngredientsActions } from "../actions/BurgerIngredients/BurgerIngredients";
import { TLoginActions } from "../actions/Login/Login";
import { TModalActions } from "../actions/Modal/Modal";
import { TOrderDetailsActions } from "../actions/OrderDetails/OrderDetails";
import { TProfileActions } from "../actions/Profile/Profile";
import { TRegisterActions } from "../actions/Register/Register";
import { TResetPasswordActions } from "../actions/ResetPassword/ResetPassword";
import { store } from "../store/store";
import { ThunkAction /*, ThunkDispatch*/ } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TWsFeedActions } from "../actions/wsFeed/wsFeed";
import { TWsProfileOrdersActions } from "../actions/wsProfileOrders/wsProfileOrders";

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TLoginActions
    | TModalActions
    | TOrderDetailsActions
    | TProfileActions
    | TRegisterActions
    | TResetPasswordActions
    | TWsFeedActions
    | TWsProfileOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;
//export type TAppDispatch = ThunkDispatch<RootState,never,TApplicationActions >
//export type TAppDispatch = () => AppDispatch | AppThunk;
export type TAppDispatch = AppDispatch | AppThunk;