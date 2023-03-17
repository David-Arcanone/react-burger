import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_ORDER_BUN,
  MOVE_INGREDIENT,
  INIT_CONSTRUCTOR_LIBRARY,
  REFRESH_PRICE,
  CLEAN_CONSTRUCTOR,
} from '../actions/BurgerConstructor/BurgerConstructor';

const initialState = {
  bunsMenu: [],
  ingredientsMenu: [],
  orderBun: 0, // индексы булочек сдвигаю на +1, 0 будет когда булок нет.
  orderIngredients: [],
  totalPrice: 0,
  ready: false,
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
        totalPrice: state.totalPrice - state.ingredientsMenu[action.deletedIngredientType].price,
        orderIngredients: [...state.orderIngredients].filter(foodItem => foodItem.uuid !== action.uuid)
      };
    }
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        totalPrice: state.totalPrice + state.ingredientsMenu[action.menuIndex].price,
        orderIngredients: [...state.orderIngredients, { uuid: action.uuid, ingredientType: action.menuIndex }]
      };
    }
    case CHANGE_ORDER_BUN: {
      const priceDecrease = (state.orderBun === 0) ? 0 : state.bunsMenu[state.orderBun - 1].price * 2;
      return {
        ...state,
        totalPrice: state.totalPrice - priceDecrease + state.bunsMenu[action.menuIndex].price * 2,
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
        totalPrice: state.bunsMenu[state.orderBun - 1].price * 2 + state.orderIngredients.reduce((sum, ingredient) => {
          return state.ingredientsMenu[ingredient.ingredientType].price + sum;
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