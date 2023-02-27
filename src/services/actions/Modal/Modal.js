//выбранный ингредиент
export const OPEN_INGREDIENT_FOCUS = 'OPEN_INGREDIENT_FOCUS';
export const OPEN_ORDER_INFO = 'OPEN_ORDER_INFO';
export const CLOSE_MODAL = 'CLOSE_MODAL';
/*
export function openIngredientFocus() {
    return function (dispatch) {
        dispatch({
            type: OPEN_INGREDIENT_FOCUS
        });
    };
}*/
export function openOrderInfo() {
    return function (dispatch) {
        dispatch({
            type: OPEN_ORDER_INFO
        });
    };
}

export function closeModal() {
    return function (dispatch) {
        dispatch({
            type: CLOSE_MODAL
        });
    };
}