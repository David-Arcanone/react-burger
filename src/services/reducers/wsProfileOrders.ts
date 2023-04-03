
import { TWsState } from "../types/websocket/websocket";
import {TWsProfileOrdersActions} from "../actions/wsProfileOrders/wsProfileOrders"
import { WS_PROFILE_ORDERS_CONNECTION_CLOSED, WS_PROFILE_ORDERS_CONNECTION_ERROR, WS_PROFILE_ORDERS_CONNECTION_SUCCESS, WS_PROFILE_ORDERS_GET_LIST } from "../constants/wsProfileOrders/wsProfileOrders";

export const initialState:TWsState  = {
    wsConnection: false,
    ordersList: [],
    total: 0,
    totalToday: 0,
    firstPack: false
};

export const wsProfileOrdersReducer = (state = initialState, action:TWsProfileOrdersActions):TWsState=> {
    switch (action.type) {
        case WS_PROFILE_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: undefined,
                wsConnection: true,
            };
        }
        case WS_PROFILE_ORDERS_CONNECTION_CLOSED: {
            return {
                ...initialState,
                error: undefined,
                wsConnection: false,
            };
        }
        case WS_PROFILE_ORDERS_CONNECTION_ERROR: {
            return {
                ...initialState,
                error: action.payload,
                wsConnection: false,
            };
        }
        case WS_PROFILE_ORDERS_GET_LIST: {
            return {
                ...state,
                error: undefined,
                ordersList: action.payload.orders??[],
                total: action.payload.total??0,
                totalToday: action.payload.totalToday??0,
                firstPack: true,
            };
        }
        default: {
            return state;
        }
    }
};