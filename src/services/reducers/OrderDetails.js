import {
  //CHANGE_ORDER,
  CLEAR_ORDER,
  LOAD_ORDER_REQUEST,
  LOAD_ORDER_REQUEST_FAILED,
  LOAD_ORDER_REQUEST_SUCCES
} from '../actions/OrderDetails/OrderDetails'

const initialState = {
  orderRequest: false,
  orderRequestFailed: false,
  orderNumber: "загрузка",
  orderName: "",//для лога можно использовать
  unResponded: false,
};
export const orderDetailsReducer = (state = initialState, action) => {
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
    case CLEAR_ORDER: {
      //устанавливаю флаг unResponded, если пользователь закрыл не увидев ответ с сервера
      //если функционал возвращения в неуведенный заказ не нужен, эту if удалю
      if (state.orderRequest) {
        return {
          ...state,
          unResponded: true,
        }
      }
      //при этом закрытии, пользователь уже видел заказ, флаг ставлю стандартный
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};