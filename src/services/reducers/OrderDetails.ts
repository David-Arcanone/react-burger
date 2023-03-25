import { TOrderDetailsActions } from "../actions/OrderDetails/OrderDetails";
import { CLEAR_ORDER, LOAD_ORDER_REQUEST, LOAD_ORDER_REQUEST_FAILED, LOAD_ORDER_REQUEST_SUCCES, SUSPEND_ORDER } from "../constants/OrderDetails/OrderDetails";
import { IOrderDetailsState } from "../types/OrderDetails/OrderDetails";


const initialState:IOrderDetailsState = {
  orderRequest: false,
  orderRequestFailed: false,
  orderNumber: "загрузка",
  orderName: "",//для лога можно использовать
  unResponded: false,
};
export const orderDetailsReducer = (state = initialState, action:TOrderDetailsActions):IOrderDetailsState => {
  switch (action.type) {
    case LOAD_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case LOAD_ORDER_REQUEST_SUCCES: {
      return {
        ...state,
        orderRequestFailed: false,
        orderRequest: false,
        orderName: action.payloadOrderName,
        orderNumber: action.payloadOrderNumber,
      };
    }
    case LOAD_ORDER_REQUEST_FAILED: {
      return {
        ...state,
        orderRequestFailed: true,
        orderRequest: false,
      };
    }
    case SUSPEND_ORDER: {
      //устанавливаю флаг unResponded, если пользователь закрыл не увидев ответ с сервера
      //если функционал возвращения в неуведенный заказ не нужен, удалю
      return {
        ...state,
        unResponded: true,
      }
    }
    case CLEAR_ORDER: {
      //при этом закрытии, пользователь уже видел заказ
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};