import {
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_GET_LIST,
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_END
} from '../../constants/wsProfileOrders/wsProfileOrders';
import { TMessage } from '../../types/websocket/websocket';

export interface IWsProfileOrdersConnectionSuccess {
  type: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS;
};
export interface IWsProfileOrdersConnectionError {
  type: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR;
  payload: Event;
};
export interface IWsProfileOrdersConnectionClosed {
  type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED;
};
export interface IWsProfileOrdersGetList {
  type: typeof WS_PROFILE_ORDERS_GET_LIST;
  payload: TMessage;
};
export interface IWsProfileOrdersConnectionStart {
  type: typeof WS_PROFILE_ORDERS_CONNECTION_START;
};
export interface IWsProfileOrdersConnectionEnd {
  type: typeof WS_PROFILE_ORDERS_CONNECTION_END;
};

export type TWsProfileOrdersActions = IWsProfileOrdersConnectionSuccess
  | IWsProfileOrdersConnectionError
  | IWsProfileOrdersConnectionClosed
  | IWsProfileOrdersGetList
  | IWsProfileOrdersConnectionStart
  | IWsProfileOrdersConnectionEnd;

  export const wsProfileOrdersConnectionEnd = ():IWsProfileOrdersConnectionEnd => {
    return {
      type: WS_PROFILE_ORDERS_CONNECTION_END
    };
  };
  export const wsProfileOrdersConnectionStart = ():IWsProfileOrdersConnectionStart => {
    return {
      type: WS_PROFILE_ORDERS_CONNECTION_START
    };
  }; 
