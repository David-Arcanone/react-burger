//выбранный ингредиент
export const OPEN_INGREDIENT_FOCUS = 'OPEN_INGREDIENT_FOCUS';
export const OPEN_ORDER_INFO = 'OPEN_ORDER_INFO';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openOrderInfo() {
    return {
        type: OPEN_ORDER_INFO,
    };
}

export function openIngredientFocus() {
    return {
        type: OPEN_INGREDIENT_FOCUS,
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}
