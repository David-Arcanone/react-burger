/*
import {
    CHANGE_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
  } from '../actions/IngredientDetails/IngredientDetails';
  
  const initialState = {
    ingredientInFocus: false,
    currentFood: {}
  };
  
  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_CURRENT_INGREDIENT: {
        return {
          ...state,
          currentFood: action.foodData,
          ingredientInFocus: true
        };
      }
      case CLEAR_CURRENT_INGREDIENT: {
        return {
          ...initialState
        };
      }
      default: {
        return state;
      }
    }
  };*/