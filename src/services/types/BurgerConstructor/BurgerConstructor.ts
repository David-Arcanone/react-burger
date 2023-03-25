export interface IIngredient {
    _id?: string;
    name?: string;
    type?: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    price?: number;
    image?: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
  }
//////////BurgerConstructor
export interface IOrderIngredients {
  uuid: string;
  ingredientType: number;
}
export interface IBurgerConstructorState {
    bunsMenu: IIngredient[];
    ingredientsMenu: IIngredient[];
    orderBun: number;
    orderIngredients: IOrderIngredients[];
    totalPrice: number;
    ready: boolean;
  }
  export type TBurgerConstructorProps={closeModalCallback:()=>void}