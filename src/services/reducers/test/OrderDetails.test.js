import { orderDetailsReducer as reducer, initialState } from '../OrderDetails.ts';
import * as types from '../../constants/OrderDetails/OrderDetails';
const testInitialState = {
    orderRequest: false,
    orderRequestFailed: false,
    orderNumber: "111",
    orderName: "222",
    unResponded: true,
}

describe('orderDetails reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('LOAD_ORDER_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.LOAD_ORDER_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                orderNumber: "загрузка",
                orderName: "",
                orderRequest: true
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.LOAD_ORDER_REQUEST,
                }
            )
        ).toEqual({
            ...testInitialState,
            orderRequest: true,
        })
    })

    it('LOAD_ORDER_REQUEST_FAILED', () => {
        expect(
            reducer(undefined, {
                type: types.LOAD_ORDER_REQUEST_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                orderRequestFailed: true
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.LOAD_ORDER_REQUEST_FAILED,
                }
            )
        ).toEqual({
            ...testInitialState,
            orderRequestFailed: true,
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
                ...initialState,
                orderNumber: "555",
                orderName: "Бургер Солнца",
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    orderRequest: true,
                    orderRequestFailed: true,
                },
                {
                    type: types.LOAD_ORDER_REQUEST_SUCCES,
                    payloadOrderName: "Бургер Солнца",
                    payloadOrderNumber: "555",
                }
            )
        ).toEqual({
            ...testInitialState,
            orderNumber: "555",
            orderName: "Бургер Солнца",
        })
    })

    it('SUSPEND_ORDER', () => {
        expect(
            reducer(undefined, {
                type: types.SUSPEND_ORDER
            })
        ).toEqual(
            {
                ...initialState,
                unResponded: true,
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.SUSPEND_ORDER,
                }
            )
        ).toEqual({
            ...testInitialState,
            unResponded: true,
        })
    })

    it('CLEAR_ORDER', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_ORDER
            })
        ).toEqual(initialState)

        expect(
            reducer(
                testInitialState,
                {
                    type: types.CLEAR_ORDER,
                }
            )
        ).toEqual(initialState)
    })
})
