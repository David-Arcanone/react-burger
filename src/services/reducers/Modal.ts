import {TModalActions} from '../actions/Modal/Modal';
import { CLOSE_MODAL, OPEN_INGREDIENT_FOCUS, OPEN_ORDER_INFO } from '../constants/Modal/Modal';
import { IModalState } from '../types/Modal/Modal';
  
  const initialState:IModalState = {
    modalData: ""
  };
  
  export const modalReducer = (state = initialState, action:TModalActions):IModalState => {
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