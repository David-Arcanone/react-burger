import { wsProfileOrdersReducer as reducer } from '../wsProfileOrders.ts';
import * as types from '../../constants/wsProfileOrders/wsProfileOrders';
import { error } from 'console';
const testOrders1 = [
    {
        ingredients: ["1", "2", "3", "2"],
        _id: "1",
        status: "done",
        number: 111111,
        name: "sand burger",
        createdAt: "2023-03-30T10:03:46.688Z",
        updatedAt: "2023-03-31T10:03:46.688Z"
    },
    {
        ingredients: ["1", "4", "4", "4"],
        _id: "2",
        status: "done",
        number: 111112,
        name: "bad burger",
        createdAt: "2023-03-29T10:03:46.688Z",
        updatedAt: "2023-03-30T10:03:46.688Z"
    }
];
const testOrders2 = [
    {
        ingredients: ["1", "2", "2", "2", "2", "4"],
        _id: "3",
        status: "done",
        number: 3,
        name: "water burger",
        createdAt: "2023-03-30T10:03:46.688Z",
        updatedAt: "2023-03-30T11:03:46.688Z"
    },
    {
        ingredients: ["1"],
        _id: "4",
        status: "done",
        number: 4,
        name: "cheap burger",
        createdAt: "2023-03-29T10:03:46.688Z",
        updatedAt: "2023-03-30T10:03:46.688Z"
    }
];

describe('wsFeed Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            wsConnection: false,
            ordersList: [],
            total: 0,
            totalToday: 0,
            firstPack: false
        })
    })

    it('WS_PROFILE_ORDERS_CONNECTION_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.WS_PROFILE_ORDERS_CONNECTION_SUCCESS
            })
        ).toEqual(
            {
                wsConnection: true,
                ordersList: [],
                total: 0,
                totalToday: 0,
                firstPack: false
            }
        )

        expect(
            reducer(
                {
                    wsConnection: false,
                    ordersList: testOrders1,
                    total: 11,
                    totalToday: 1,
                    firstPack: false,
                    error: { isTrusted: true }
                },
                {
                    type: types.WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
                }
            )
        ).toEqual({
            wsConnection: true,
            ordersList: testOrders1,
            total: 11,
            totalToday: 1,
            firstPack: false
        })
    })

    it('WS_PROFILE_ORDERS_CONNECTION_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.WS_PROFILE_ORDERS_CONNECTION_ERROR,
                payload: { isTrusted: true }
            })
        ).toEqual(
            {
                wsConnection: false,
                ordersList: [],
                total: 0,
                totalToday: 0,
                firstPack: false,
                error: { isTrusted: true }
            }
        )

        expect(
            reducer(
                {
                    wsConnection: true,
                    ordersList: testOrders1,
                    total: 11,
                    totalToday: 1,
                    firstPack: false
                },
                {
                    type: types.WS_PROFILE_ORDERS_CONNECTION_ERROR,
                    payload: { isTrusted: true }
                }
            )
        ).toEqual({
            wsConnection: false,
            ordersList: [],
            total: 0,
            totalToday: 0,
            firstPack: false,
            error: { isTrusted: true }
        })
    })

    it('WS_PROFILE_ORDERS_CONNECTION_CLOSED', () => {
        expect(
            reducer(undefined, {
                type: types.WS_PROFILE_ORDERS_CONNECTION_CLOSED
            })
        ).toEqual(
            {
                wsConnection: false,
                ordersList: [],
                total: 0,
                totalToday: 0,
                firstPack: false
            }
        )

        expect(
            reducer(
                {
                    wsConnection: true,
                    ordersList: testOrders1,
                    total: 11,
                    totalToday: 1,
                    firstPack: false,
                    error: { isTrusted: true }
                },
                {
                    type: types.WS_PROFILE_ORDERS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({
            wsConnection: false,
            ordersList: [],
            total: 0,
            totalToday: 0,
            firstPack: false
        })
    })

    it('WS_PROFILE_ORDERS_GET_LIST', () => {
        expect(
            reducer(undefined, {
                type: types.WS_PROFILE_ORDERS_GET_LIST,
                payload: { orders: testOrders2, total: 100, totalToday: 20 }
            })
        ).toEqual(
            {
                wsConnection: false,
                ordersList: testOrders2,
                total: 100,
                totalToday: 20,
                firstPack: true
            }
        )

        expect(
            reducer(
                {
                    wsConnection: true,
                    ordersList: testOrders1,
                    total: 11000,
                    totalToday: 12,
                    firstPack: false,
                    error: { isTrusted: true }
                },
                {
                    type: types.WS_PROFILE_ORDERS_GET_LIST,
                    payload: { orders: testOrders2, total: 100, totalToday: 20 }
                }
            )
        ).toEqual({
            wsConnection: true,
            ordersList: testOrders2,
            total: 100,
            totalToday: 20,
            firstPack: true,
        })
    })
})
