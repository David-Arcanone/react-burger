import { CHANGE_BUNS, INCREASE_INGREDIENT_AMOUNT } from "../BurgerIngredients/BurgerIngredients";
import { v4 as uuidV4 } from "uuid";
//конструктор
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const CHANGE_ORDER_BUN = 'CHANGE_ORDER_BUN';
export const CLEAR_ORDER = "CLEAR_ORDER";
export const INIT_CONSTRUCTOR_LIBRARY = "INIT_CONSTRUCTOR_LIBRARY";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const REFRESH_PRICE = 'REFRESH_PRICE';
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';

export function addIngredientToConstructor(menuIndex) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            menuIndex,
            uuid: uuidV4(),
        });
        dispatch({
            type: INCREASE_INGREDIENT_AMOUNT,
            _id: menuIndex
        });
    };
}
export function deleteIngredientFromConstructor(uuid,ingredientType) {
    return {
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            uuid,
            deletedIngredientType: ingredientType,
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
export function moveIngredient(newIndex, oldIndex) {
    return {
            type: MOVE_INGREDIENT,
            newIndex,
            oldIndex,
    };
}
export function cleanConstructor() { //если потребуется очистка заказа
    return {
            type: CLEAN_CONSTRUCTOR
    };
}