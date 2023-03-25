import { TBurgerConstructorActions } from "../actions/BurgerConstructor/BurgerConstructor";
import { ADD_INGREDIENT_TO_CONSTRUCTOR, CHANGE_ORDER_BUN, CLEAN_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR, INIT_CONSTRUCTOR_LIBRARY, MOVE_INGREDIENT, REFRESH_PRICE } from "../constants/BurgerConstructor/BurgerConstructor";

import { IBurgerConstructorState } from "../types/BurgerConstructor/BurgerConstructor";


const initialState: IBurgerConstructorState = {
  bunsMenu: [],
  ingredientsMenu: [],
  orderBun: 0, // индексы булочек сдвигаю на +1, 0 будет когда булок нет.
  orderIngredients: [],
  totalPrice: 0,
  ready: false,
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): IBurgerConstructorState => {
  switch (action.type) {
    case INIT_CONSTRUCTOR_LIBRARY: {
      return {
        ...state,
        ingredientsMenu: action.payloadIngredients,
        bunsMenu: action.payloadBuns,
        ready: true
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        totalPrice: state.totalPrice - (state.ingredientsMenu[action.deletedIngredientType].price ?? 0),
        orderIngredients: [...state.orderIngredients].filter(foodItem => foodItem.uuid !== action.uuid)
      };
    }
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        totalPrice: state.totalPrice + (state.ingredientsMenu[action.menuIndex].price ?? 0),
        orderIngredients: [...state.orderIngredients, { uuid: action.uuid, ingredientType: action.menuIndex }]
      };
    }
    case CHANGE_ORDER_BUN: {
      const priceDecrease = (state.orderBun === 0) ? 0 : (state.bunsMenu[state.orderBun - 1].price ?? 0) * 2;
      return {
        ...state,
        totalPrice: state.totalPrice - priceDecrease + (state.bunsMenu[action.menuIndex].price ?? 0) * 2,
        orderBun: action.menuIndex + 1,
      };
    }
    case MOVE_INGREDIENT: {
      const cloneOrderIngredients = state.orderIngredients.slice(0); //нельзя напрямую влиять на state, поэтому создам клон для работы можно через [...state.orderIngredients]
      cloneOrderIngredients.splice(action.newIndex, 0, cloneOrderIngredients.splice(action.oldIndex, 1)[0]);
      return {
        ...state,
        orderIngredients: cloneOrderIngredients,
      };
    }
    case REFRESH_PRICE: {
      return {
        ...state,
        totalPrice: (state.bunsMenu[state.orderBun - 1].price ?? 0) * 2 + state.orderIngredients.reduce((sum, ingredient) => {
          return (state.ingredientsMenu[ingredient.ingredientType].price ?? 0) + sum;
        }, 0)
      };
    }
    case CLEAN_CONSTRUCTOR: {
      return {
        ...state,
        orderBun: 0, // индексы булочек сдвигаю на +1, 0 будет когда булок нет.
        orderIngredients: [],
        totalPrice: 0,
      }
    }
    default: {
      return state;
    }
  }
};