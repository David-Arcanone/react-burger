///////////Burger Ingredients

import { IIngredient } from "../BurgerConstructor/BurgerConstructor";

export interface IBurgerIngredientsPanel {
  ingredientData: IIngredient;
  qty: number;
}
export interface IBurgerIngredientsState {
  ingredients: IBurgerIngredientsPanel[];
  buns: IBurgerIngredientsPanel[];
  ingredientRequest: boolean;
  ingredientRequestFailed: boolean;
  bunsTabStatus: boolean;
  souceTabStatus: boolean;
  mainTabStatus: boolean;
  readyIngredients: boolean;
}