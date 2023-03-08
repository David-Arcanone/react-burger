import { configNewOrder, requestServer } from "../../../utils/Api/Api";
import { OPEN_ORDER_INFO } from "../Modal/Modal";

export const LOAD_ORDER_REQUEST = 'LOAD_ORDER_REQUEST';
export const LOAD_ORDER_REQUEST_SUCCES = 'LOAD_ORDER_REQUEST_SUCCES';
export const LOAD_ORDER_REQUEST_FAILED = 'LOAD_ORDER_REQUEST_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const SUSPEND_ORDER = 'SUSPEND_ORDER';

export function loadOrderToServer(orderList) {
    return function (dispatch) {
        dispatch({
            type: OPEN_ORDER_INFO,
        });
        dispatch({
            type: LOAD_ORDER_REQUEST
        });
        requestServer("/orders",configNewOrder(orderList)).then(data => {
            dispatch({
                type: LOAD_ORDER_REQUEST_SUCCES,
                payloadOrderName: data.name,
                payloadOrderNumber: data.order.number,
            });

        })
            .catch(() => {
                console.log("проблемы с оформлением заказа");
                dispatch({
                    type: LOAD_ORDER_REQUEST_FAILED
                });
            })
    };
}
//вызываю clear order если закрыл modal не увидев №заказа или ошибку, тогда можно вернуться в старый заказ и увидеть номер
export function clearOrder() {
    return {
        type: CLEAR_ORDER,
    };
}
export function suspendOrder() {
    return {
        type: SUSPEND_ORDER,
    };
}
