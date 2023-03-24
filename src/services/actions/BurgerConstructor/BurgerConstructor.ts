
import { v4 as uuidV4 } from "uuid";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CHANGE_ORDER_BUN,
    CLEAN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    INIT_CONSTRUCTOR_LIBRARY,
    MOVE_INGREDIENT,
    REFRESH_PRICE
} from "../../constants/BurgerConstructor/BurgerConstructor";
import { AppDispatch, AppThunk } from "../../types";
import { IIngredient } from "../../types/BurgerConstructor/BurgerConstructor";
import { changeBuns, increaseIngredientAmount } from "../BurgerIngredients/BurgerIngredients";

export interface IInitConstructorLibrary {
    type: typeof INIT_CONSTRUCTOR_LIBRARY;
    payloadIngredients: IIngredient[];
    payloadBuns: IIngredient[];
}

export interface IAddIngredientToConstructor {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly menuIndex: number;
    readonly uuid: string;
}

export interface IRefreshPrice {
    type: typeof REFRESH_PRICE;
}

export function refreshPrice(): IRefreshPrice {
    return {
        type: REFRESH_PRICE
    };
}

export interface IDeleteIngredientFromConstructor {
    readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
    readonly uuid: string;
    readonly deletedIngredientType: number;
}

export interface IChangeOrderBun {
    readonly type: typeof CHANGE_ORDER_BUN;
    readonly menuIndex: number;
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    readonly newIndex: number;
    readonly oldIndex: number;
}

export interface ICleanConstructor {
    readonly type: typeof CLEAN_CONSTRUCTOR;
}

export type TBurgerConstructorActions = ICleanConstructor
    | IMoveIngredient
    | IChangeOrderBun
    | IDeleteIngredientFromConstructor
    | IAddIngredientToConstructor
    | IInitConstructorLibrary
    | IRefreshPrice;

export const addIngredientToConstructor: AppThunk = (menuIndex: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        menuIndex,
        uuid: uuidV4(),
    });
    dispatch(increaseIngredientAmount(menuIndex));
};


export function deleteIngredientFromConstructor(uuid: string, ingredientType: number): IDeleteIngredientFromConstructor {
    return {
        type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        uuid,
        deletedIngredientType: ingredientType,
    };
}

export const changeOrderBun: AppThunk = (menuIndex: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: CHANGE_ORDER_BUN,
        menuIndex
    });
    dispatch(changeBuns(menuIndex));
};


export function moveIngredient(newIndex: number, oldIndex: number): IMoveIngredient {
    return {
        type: MOVE_INGREDIENT,
        newIndex,
        oldIndex,
    };
}

export function cleanConstructor(): ICleanConstructor {
    return {
        type: CLEAN_CONSTRUCTOR
    };
}

export function InitConstructorLibrary(ingredients: IIngredient[], buns: IIngredient[]): IInitConstructorLibrary {
    return {
        type: INIT_CONSTRUCTOR_LIBRARY,
        payloadIngredients: ingredients,
        payloadBuns: buns
    };
}