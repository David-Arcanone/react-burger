import { configAdvancedRequest, configStandartRequest, requestServer, requestServerWithRefresh } from "../../../utils/api/api";
import { CLEAR_ORDER, LOAD_ORDER_REQUEST, LOAD_ORDER_REQUEST_FAILED, LOAD_ORDER_REQUEST_SUCCES, SUSPEND_ORDER } from "../../constants/OrderDetails/OrderDetails";
import { AppDispatch, AppThunk } from "../../types";
import { TRequestBodyOrder, TRequestDataOrder } from "../../types/api/api";
import { openOrderInfo } from "../Modal/Modal";

export interface IClearOrder {
    type: typeof CLEAR_ORDER;
};

export interface ISuspendOrder {
    type: typeof SUSPEND_ORDER;
};

export interface ILoadOrderRequest {
    type: typeof LOAD_ORDER_REQUEST;
};

export interface ILoadOrderRequestSucces {
    type: typeof LOAD_ORDER_REQUEST_SUCCES;
    payloadOrderName: string;
    payloadOrderNumber: string;
};

export interface ILoadOrderRequestFailed {
    type: typeof LOAD_ORDER_REQUEST_FAILED;
};

export type TOrderDetailsActions = ILoadOrderRequestFailed
    | ILoadOrderRequestSucces
    | ILoadOrderRequest
    | ISuspendOrder
    | IClearOrder;

export const loadOrderToServer: AppThunk = (orderList: string[]) => (dispatch: AppDispatch) => {
    dispatch(openOrderInfo());
    dispatch({
        type: LOAD_ORDER_REQUEST
    });
    requestServerWithRefresh<TRequestDataOrder>("/orders", configAdvancedRequest<TRequestBodyOrder>({ ingredients: orderList }, "POST")).then(data => {
        console.log(data);
        dispatch({
            type: LOAD_ORDER_REQUEST_SUCCES,
            payloadOrderName: data.name,
            payloadOrderNumber: data.order.number.toString(),
        });

    })
        .catch(() => {
            console.log("проблемы с оформлением заказа");
            dispatch({
                type: LOAD_ORDER_REQUEST_FAILED
            });
        })
};


export function clearOrder(): IClearOrder {
    return {
        type: CLEAR_ORDER,
    };
}

export function suspendOrder(): ISuspendOrder {
    return {
        type: SUSPEND_ORDER,
    };
}
