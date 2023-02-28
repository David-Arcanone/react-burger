import {
  DOWNLOAD_INGREDIENTS_REQUEST,
  DOWNLOAD_INGREDIENTS_FAILED,
  DOWNLOAD_INGREDIENTS_SUCCES,
  DECREASE_INGREDIENT_AMOUNT,
  INCREASE_INGREDIENT_AMOUNT,
  CHANGE_BUNS,
  REFRESH_TABS,
  CLEAN_SELECTED_INGREDIENTS,
} from '../actions/BurgerIngredients/BurgerIngredients';

const initialState = {
  ingredients: [],
  buns: [],
  ingredientRequest: false,
  ingredientRequestFailed: false,
  bunsTabStatus:false,
  souceTabStatus:false,
  mainTabStatus:false,
  readyIngredients:false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientRequest: true
      };
    }
    case DOWNLOAD_INGREDIENTS_SUCCES: {
      return {
        ...state,
        ingredientRequestFailed: false,
        ingredients: [...action.payloadIngredients].map(foodItem => ({ ingredientData: foodItem, qty: 0 })),
        buns: [...action.payloadBuns].map(foodItem => ({ ingredientData: foodItem, qty: 0 })),
        ingredientRequest: false,
        readyIngredients: true
      };
    }
    case DOWNLOAD_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientRequestFailed: true,
        ingredientRequest: false
      };
    }
    case INCREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((foodItem,foodIndex) =>
        foodIndex === action._id ? { ...foodItem, qty: ++foodItem.qty} : foodItem
        )
      };
    }
    case DECREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(foodItem =>
          foodItem.ingredientData._id === action._id ? { ...foodItem, qty: --foodItem.qty} : foodItem
        )
      };
    }
    case CHANGE_BUNS: {
      return {
        ...state,
        buns: [...state.buns].map((foodItem,foodIndex) =>
        foodIndex === action._id ? { ...foodItem, qty: 2} : {...foodItem, qty: 0}//можно 1 если надо
        )
      };
    }
    case REFRESH_TABS: {
      return {
        ...state,
        bunsTabStatus: action.bunsTab,
        souceTabStatus: action.souceTab,
        mainTabStatus: action.mainTab
      };
    }
    case CLEAN_SELECTED_INGREDIENTS: {
      return {
        ...state,
        buns:[...state.buns].map((foodItem)=>({...foodItem,qty:0})),
        ingredients: [...state.ingredients].map((foodItem)=>({...foodItem,qty:0}))
      }
    }
    default: {
      return state;
    }
  }
};