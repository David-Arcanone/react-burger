import { modalReducer as reducer,initialState } from '../Modal.ts';
import * as types from '../../constants/Modal/Modal';


describe('modalReducer reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('OPEN_INGREDIENT_FOCUS', () => {
        expect(
            reducer(undefined, {type: types.OPEN_INGREDIENT_FOCUS,})
        ).toEqual(
            {modalData: types.OPEN_INGREDIENT_FOCUS})

        expect(
            reducer(
                {modalData: "test"},
                {type: types.OPEN_INGREDIENT_FOCUS,}
            )
        ).toEqual({
            modalData: types.OPEN_INGREDIENT_FOCUS,
        })
    })

    it('OPEN_ORDER_INFO', () => {
        expect(
            reducer(undefined, {type: types.OPEN_ORDER_INFO,})
        ).toEqual({modalData: types.OPEN_ORDER_INFO})

        expect(
            reducer({modalData: "test"},{type: types.OPEN_ORDER_INFO,})
        ).toEqual({modalData: types.OPEN_ORDER_INFO,})
    })

    it('CLOSE_MODAL', () => {
        expect(
            reducer(undefined, {
                type: types.CLOSE_MODAL,
            })
        ).toEqual(
            {modalData: ""})

        expect(
            reducer(
                {modalData: "test"},{type: types.CLOSE_MODAL,})
        ).toEqual({modalData: ""})
    })
})