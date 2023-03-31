import { orderDetailsReducer as reducer } from '../OrderDetails.ts';
import * as types from '../../constants/OrderDetails/OrderDetails';

describe('orderDetails reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            orderRequest: false,
            orderRequestFailed: false,
            orderNumber: "загрузка",
            orderName: "",
            unResponded: false,
        })
    })

    it('LOAD_ORDER_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.LOAD_ORDER_REQUEST
            })
        ).toEqual(
            {
                orderRequest: true,
                orderRequestFailed: false,
                orderNumber: "загрузка",
                orderName: "",
                unResponded: false,
            }
        )

        expect(
            reducer(
                {
                    orderRequest: false,
                    orderRequestFailed: false,
                    orderNumber: "sdsdsdsd",
                    orderName: "sdsdsdsdsdsd",
                    unResponded: true,
                },
                {
                    type: types.LOAD_ORDER_REQUEST,
                }
            )
        ).toEqual({
            orderRequest: true,
            orderRequestFailed: false,
            orderNumber: "sdsdsdsd",
            orderName: "sdsdsdsdsdsd",
            unResponded: true,
        })
    })

    it('LOAD_ORDER_REQUEST_FAILED', () => {
        expect(
            reducer(undefined, {
                type: types.LOAD_ORDER_REQUEST_FAILED
            })
        ).toEqual(
            {
                orderRequest: false,
                orderRequestFailed: true,
                orderNumber: "загрузка",
                orderName: "",
                unResponded: false,
            }
        )

        expect(
            reducer(
                {
                    orderRequest: true,
                    orderRequestFailed: false,
                    orderNumber: "22",
                    orderName: "22",
                    unResponded: false,
                },
                {
                    type: types.LOAD_ORDER_REQUEST_FAILED,
                }
            )
        ).toEqual({
            orderRequest: false,
            orderRequestFailed: true,
            orderNumber: "22",
            orderName: "22",
            unResponded: false,
        })
    })

    it('LOAD_ORDER_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.LOAD_ORDER_REQUEST_SUCCES,
                payloadOrderName: "Бургер Солнца",
                payloadOrderNumber: "555",
            })
        ).toEqual(
            {
                orderRequest: false,
                orderRequestFailed: false,
                orderNumber: "555",
                orderName: "Бургер Солнца",
                unResponded: false,
            }
        )

        expect(
            reducer(
                {
                    orderRequest: true,
                    orderRequestFailed: true,
                    orderNumber: "загрузка",
                    orderName: "---",
                    unResponded: false,
                },
                {
                    type: types.LOAD_ORDER_REQUEST_SUCCES,
                    payloadOrderName: "Бургер Солнца",
                    payloadOrderNumber: "555",
                }
            )
        ).toEqual({
            orderRequest: false,
            orderRequestFailed: false,
            orderNumber: "555",
            orderName: "Бургер Солнца",
            unResponded: false,
        })
    })

    it('SUSPEND_ORDER', () => {
        expect(
            reducer(undefined, {
                type: types.SUSPEND_ORDER
            })
        ).toEqual(
            {
                orderRequest: false,
                orderRequestFailed: false,
                orderNumber: "загрузка",
                orderName: "",
                unResponded: true,
            }
        )

        expect(
            reducer(
                {
                    orderRequest: true,
                    orderRequestFailed: false,
                    orderNumber: "444",
                    orderName: "Лунный сэндвич",
                    unResponded: false,
                },
                {
                    type: types.SUSPEND_ORDER,
                }
            )
        ).toEqual({
            orderRequest: true,
            orderRequestFailed: false,
            orderNumber: "444",
            orderName: "Лунный сэндвич",
            unResponded: true,
        })
    })

    it('CLEAR_ORDER', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_ORDER
            })
        ).toEqual(
            {
                orderRequest: false,
                orderRequestFailed: false,
                orderNumber: "загрузка",
                orderName: "",
                unResponded: false,
            }
        )

        expect(
            reducer(
                {
                    orderRequest: true,
                    orderRequestFailed: true,
                    orderNumber: "Бяка",
                    orderName: "333",
                    unResponded: true,
                },
                {
                    type: types.CLEAR_ORDER,
                }
            )
        ).toEqual({
            orderRequest: false,
            orderRequestFailed: false,
            orderNumber: "загрузка",
            orderName: "",
            unResponded: false,
        })
    })
})
