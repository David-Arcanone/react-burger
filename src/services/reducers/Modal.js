import {
    OPEN_INGREDIENT_FOCUS,
    OPEN_ORDER_INFO,
    CLOSE_MODAL,
  } from '../actions/Modal/Modal';
  
  const initialState = {
    modalData: ""
  };
  
  export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_INGREDIENT_FOCUS: {
        return {
          ...state,
          modalData: OPEN_INGREDIENT_FOCUS
        };
      }
      case OPEN_ORDER_INFO: {
        return {
          ...state,
          modalData: OPEN_ORDER_INFO
        };
      }
      case CLOSE_MODAL: {
        return {
          ...initialState
        };
      }
      default: {
        return state;
      }
    }
  };