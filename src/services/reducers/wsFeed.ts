import { TWsFeedActions } from "../actions/wsFeed/wsFeed";
import { WS_FEED_CONNECTION_CLOSED, 
    WS_FEED_CONNECTION_ERROR, 
    WS_FEED_CONNECTION_SUCCESS, 
    WS_FEED_GET_LIST } from "../constants/wsFeed/wsFeed";
import { TWsState } from "../types/websocket/websocket";

export const initialState:TWsState  = {
    wsConnection: false,
    ordersList: [],
    total: 0,
    totalToday: 0,
    firstPack:false
};

export const wsFeedReducer = (state = initialState, action:TWsFeedActions):TWsState=> {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS: {
            return {
                ...state, 
                error: undefined,
                wsConnection: true,
            };
        }
        case WS_FEED_CONNECTION_CLOSED: {
            return {
                ...initialState ,
                error: undefined,
                wsConnection: false,
            };
        }
        case WS_FEED_CONNECTION_ERROR: {
            return {
                ...initialState,
                error: action.payload,
                wsConnection: false,
            };
        }
        case WS_FEED_GET_LIST: {
            return {
                ...state,
                error: undefined,
                ordersList: action.payload.orders??[],
                total: action.payload.total??0,
                totalToday: action.payload.totalToday??0,
                firstPack: true
            };
        }
        default: {
            return state;
        }
    }
};