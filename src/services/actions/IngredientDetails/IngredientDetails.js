import { OPEN_INGREDIENT_FOCUS } from "../Modal/Modal";

//выбранный ингредиент
export const CHANGE_CURRENT_INGREDIENT = 'CHANGE_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

export function changeCurrentFocusIngredient(data) {
    return function (dispatch) {
        dispatch({
            type: CHANGE_CURRENT_INGREDIENT,
            foodData: data
        });
        dispatch({
            type: OPEN_INGREDIENT_FOCUS
        });
    };
}
export function clearCurrentIngredient() {
    return {
        type: CLEAR_CURRENT_INGREDIENT,
    };
}
