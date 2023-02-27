import { CHANGE_BUNS, INCREASE_INGREDIENT_AMOUNT } from "../BurgerIngredients/BurgerIngredients";

//конструктор
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const CHANGE_ORDER_BUN = 'CHANGE_ORDER_BUN';
export const CLEAR_ORDER = "CLEAR_ORDER";
export const INIT_CONSTRUCTOR_LIBRARY = "INIT_CONSTRUCTOR_LIBRARY";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const REFRESH_PRICE = 'REFRESH_PRICE';

export function addIngredientToConstructor(menuIndex) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            menuIndex
        });
        dispatch({
            type: INCREASE_INGREDIENT_AMOUNT,
            _id: menuIndex
        });
    };
}
export function deleteIngredientFromConstructor(uuid,ingredientType) {
    return function (dispatch) {
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            uuid,
            deletedIngredientType: ingredientType
        });
    };
}
export function changeOrderBun(menuIndex){
    return function (dispatch) {
        dispatch({
            type: CHANGE_ORDER_BUN,
            menuIndex
        });
        dispatch({
            type: CHANGE_BUNS,
            _id: menuIndex
        });
    };
}
export function clearOrder() { //если потребуется очистка заказа
    return function (dispatch) {
        dispatch({
            type: CLEAR_ORDER
        });
    };
}
export function moveIngredient(newIndex, oldIndex) { //если потребуется очистка заказа
    return function (dispatch) {
        dispatch({
            type: MOVE_INGREDIENT,
            newIndex,
            oldIndex
        });
    };
}