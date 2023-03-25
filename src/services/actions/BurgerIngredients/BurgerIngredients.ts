import { requestServer } from '../../../utils/api/api';
import {
    CHANGE_BUNS,
    CLEAN_SELECTED_INGREDIENTS,
    DECREASE_INGREDIENT_AMOUNT,
    DOWNLOAD_INGREDIENTS_FAILED,
    DOWNLOAD_INGREDIENTS_REQUEST,
    DOWNLOAD_INGREDIENTS_SUCCES,
    INCREASE_INGREDIENT_AMOUNT,
    REFRESH_TABS
} from '../../constants/BurgerIngredients/BurgerIngredients';
import { AppDispatch, AppThunk } from '../../types';
import { TRequestDataIngredients } from '../../types/api/api';
import { IIngredient } from '../../types/BurgerConstructor/BurgerConstructor';
import { InitConstructorLibrary, refreshPrice } from '../BurgerConstructor/BurgerConstructor';

export interface IChangeBuns {
    readonly type: typeof CHANGE_BUNS;
    readonly _id: number;
}

export interface IIncreaseIngredientAmount {
    readonly type: typeof INCREASE_INGREDIENT_AMOUNT;
    readonly _id: number;
}

export interface IDownloadIngredientsRequest {
    type: typeof DOWNLOAD_INGREDIENTS_REQUEST;
}

export interface IDownloadIngredientsSucces {
    type: typeof DOWNLOAD_INGREDIENTS_SUCCES;
    payloadIngredients: IIngredient[];
    payloadBuns: IIngredient[];
}

export interface IDownloadIngredientsFailed {
    type: typeof DOWNLOAD_INGREDIENTS_FAILED;
}

export interface IDecreaseIngredientCount {
    type: typeof DECREASE_INGREDIENT_AMOUNT;
    _id: string;
}

export interface IRefreshTabs {
    type: typeof REFRESH_TABS;
    bunsTab: boolean;
    souceTab: boolean;
    mainTab: boolean;
}

export interface ICleanSelectedIngredients {
    type: typeof CLEAN_SELECTED_INGREDIENTS;
}

export type TBurgerIngredientsActions = ICleanSelectedIngredients
    | IRefreshTabs
    | IDecreaseIngredientCount
    | IDownloadIngredientsFailed
    | IDownloadIngredientsSucces
    | IDownloadIngredientsRequest
    | IIncreaseIngredientAmount
    | IChangeBuns;

export const downloadIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: DOWNLOAD_INGREDIENTS_REQUEST
    });
    requestServer<TRequestDataIngredients>("/ingredients").then(data => {
        const buns = data.data.filter((foodItem: IIngredient) => foodItem.type === "bun");
        const ingredients = data.data.filter((foodItem: IIngredient) => foodItem.type !== "bun");
        dispatch({
            type: DOWNLOAD_INGREDIENTS_SUCCES,
            payloadIngredients: ingredients,
            payloadBuns: buns
        });
        dispatch(InitConstructorLibrary(ingredients, buns));
        dispatch(refreshPrice())
    })
        .catch(() => {
            dispatch({
                type: DOWNLOAD_INGREDIENTS_FAILED
            });
        })
};

export function decreaseIngredientCount(id: string): IDecreaseIngredientCount {
    return {
        type: DECREASE_INGREDIENT_AMOUNT,
        _id: id,
    };
}

export function refreshTabs(bunVisible: boolean, souceVisible: boolean, mainVisible: boolean): IRefreshTabs {
    return {
        type: REFRESH_TABS,
        bunsTab: bunVisible,
        souceTab: !bunVisible && souceVisible,
        mainTab: !bunVisible && !souceVisible && mainVisible,
    };
}

export function cleanSelectedIngredients(): ICleanSelectedIngredients {
    return {
        type: CLEAN_SELECTED_INGREDIENTS,
    };
}

export function changeBuns(menuIndex: number): IChangeBuns {
    return {
        type: CHANGE_BUNS,
        _id: menuIndex
    };
}

export function increaseIngredientAmount(menuIndex: number): IIncreaseIngredientAmount {
    return {
        type: INCREASE_INGREDIENT_AMOUNT,
        _id: menuIndex
    };
} 