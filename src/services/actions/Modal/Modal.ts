import { CLOSE_MODAL, OPEN_INGREDIENT_FOCUS, OPEN_ORDER_INFO } from "../../constants/Modal/Modal";

export interface IOpenOrderInfo {
    type: typeof OPEN_ORDER_INFO;
};

export interface IOpenIngredientFocus {
    type: typeof OPEN_INGREDIENT_FOCUS;
};

export interface ICloseModal {
    type: typeof CLOSE_MODAL;
};

export type TModalActions = IOpenOrderInfo | IOpenIngredientFocus | ICloseModal;

export function openOrderInfo(): IOpenOrderInfo {
    return {
        type: OPEN_ORDER_INFO,
    };
}

export function openIngredientFocus(): IOpenIngredientFocus {
    return {
        type: OPEN_INGREDIENT_FOCUS,
    };
}

export function closeModal(): ICloseModal {
    return {
        type: CLOSE_MODAL,
    };
}
