import { getIngridients } from '../../../utils/Api/Api';
import {INIT_CONSTRUCTOR_LIBRARY, REFRESH_PRICE} from "../BurgerConstructor/BurgerConstructor"
//инициализация
export const DOWNLOAD_INGREDIENTS_REQUEST = 'DOWNLOAD_INGREDIENTS_REQUEST';
export const DOWNLOAD_INGREDIENTS_FAILED = 'DOWNLOAD_INGREDIENTS_FAILED';
export const DOWNLOAD_INGREDIENTS_SUCCES = 'DOWNLOAD_INGREDIENTS_SUCCES';
export const INCREASE_INGREDIENT_AMOUNT = 'INCREASE_INGREDIENT_AMOUNT';
export const DECREASE_INGREDIENT_AMOUNT = 'DECREASE_INGREDIENT_AMOUNT';
export const CHANGE_BUNS = 'CHANGE_BUNS';
export const REFRESH_TABS = 'REFRESH_TABS';

export function downloadIngredients() {
    return function (dispatch) {
        dispatch({
            type: DOWNLOAD_INGREDIENTS_REQUEST
        });
        getIngridients().then(data => {
            const buns =data.filter((foodItem)=>foodItem.type==="bun");
            const ingredients = data.filter((foodItem)=>foodItem.type!=="bun");
            dispatch({
                type: DOWNLOAD_INGREDIENTS_SUCCES,
                payloadIngredients: ingredients,
                payloadBuns: buns
            });
            dispatch({
                type: INIT_CONSTRUCTOR_LIBRARY,
                payloadIngredients: ingredients,
                payloadBuns: buns
            });
            dispatch({
                type: REFRESH_PRICE,
            })
        })
            .catch(() => {
                dispatch({
                    type: DOWNLOAD_INGREDIENTS_FAILED
                });
            })
    };
}
/*
export function increaseIngredientCount(id) {
    return function (dispatch) {
        dispatch({
            type: INCREASE_INGREDIENT_AMOUNT,
            _id: id
        });
    };
}*/

export function decreaseIngredientCount(id) {
    return function (dispatch) {
        dispatch({
            type: DECREASE_INGREDIENT_AMOUNT,
            _id: id
        });
    };
}
/*
export function changeBuns(id) {
    return function (dispatch) {
        dispatch({
            type: CHANGE_BUNS,
            _id: id
        });
    };
}*/
export function refreshTabs(bunVisible,souceVisible, mainVisible) {

    return function (dispatch) {
        dispatch({
            type: REFRESH_TABS,
            bunsTab: bunVisible,
            souceTab:!bunVisible&&souceVisible,
            mainTab: !bunVisible&&!souceVisible&&mainVisible
        });
    };
}

