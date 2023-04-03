import { wsFeedReducer as reducer, initialState } from '../wsFeed.ts';
import * as types from '../../constants/wsFeed/wsFeed';
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
const testInitialState = {
    wsConnection: true,
    ordersList: testOrders1,
    total: 11,
    totalToday: 1,
    firstPack: false,
}

describe('wsFeed Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('WS_FEED_CONNECTION_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.WS_FEED_CONNECTION_SUCCESS
            })
        ).toEqual(
            {
                ...initialState,
                wsConnection: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    wsConnection: false,
                    error: { isTrusted: true }
                },
                {
                    type: types.WS_FEED_CONNECTION_SUCCESS,
                }
            )
        ).toEqual(testInitialState)
    })

    it('WS_FEED_CONNECTION_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.WS_FEED_CONNECTION_ERROR,
                payload: { isTrusted: true }
            })
        ).toEqual(
            {
                ...initialState,
                error: { isTrusted: true }
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.WS_FEED_CONNECTION_ERROR,
                    payload: { isTrusted: true }
                }
            )
        ).toEqual({
            ...initialState,
            error: { isTrusted: true }
        })
    })

    it('WS_FEED_CONNECTION_CLOSED', () => {
        expect(
            reducer(undefined, {
                type: types.WS_FEED_CONNECTION_CLOSED
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.WS_FEED_CONNECTION_CLOSED,
                }
            )
        ).toEqual(initialState)
    })

    it('WS_FEED_GET_LIST', () => {
        expect(
            reducer(undefined, {
                type: types.WS_FEED_GET_LIST,
                payload: { orders: testOrders2, total: 100, totalToday: 20 }
            })
        ).toEqual(
            {
                ...initialState,
                ordersList: testOrders2,
                total: 100,
                totalToday: 20,
                firstPack: true
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    error: { isTrusted: true }
                },
                {
                    type: types.WS_FEED_GET_LIST,
                    payload: { orders: testOrders2, total: 100, totalToday: 20 }
                }
            )
        ).toEqual({
            ...testInitialState,
            ordersList: testOrders2,
            total: 100,
            totalToday: 20,
            firstPack: true,
        })
    })
})
