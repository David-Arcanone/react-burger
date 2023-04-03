import { registerReducer as reducer, initialState } from '../Register.ts';
import * as types from '../../constants/Register/Register';
const testInitialState = {
    inputs: {
        email: "1@1.ru",
        password: "пароль1",
        name: "имя1",
    },
    isRequesting: false,
    isPasswordHidden: false,
}

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('REGISTER_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_START
            })
        ).toEqual(
            {
                ...initialState,
                isRequesting: true,
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.REGISTER_REQUEST_START,
                }
            )
        ).toEqual({
            ...testInitialState,
            isRequesting: true,
        })
    })

    it('REGISTER_REQUEST_FAILED', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_FAILED
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isRequesting: true,
                },
                {
                    type: types.REGISTER_REQUEST_FAILED,
                }
            )
        ).toEqual(testInitialState)
    })

    it('REGISTER_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_SUCCES
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isRequesting: true,
                },
                {
                    type: types.REGISTER_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "",
                password: "",
                name: "",
            },
        })
    })

    it('CLEAR_CURRENT_REGISTER_INPUTS', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_REGISTER_INPUTS
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.CLEAR_CURRENT_REGISTER_INPUTS,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "",
                password: "",
                name: "",
            },
        })
    })

    it('SHOW_CURRENT_REGISTER_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_REGISTER_INPUT_PASSWORD
            })
        ).toEqual(
            {
                ...initialState,
                isPasswordHidden: false,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isPasswordHidden: true,
                },
                {
                    type: types.SHOW_CURRENT_REGISTER_INPUT_PASSWORD,
                }
            )
        ).toEqual(testInitialState)
    })

    it('HIDE_CURRENT_REGISTER_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_REGISTER_INPUT_PASSWORD
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.HIDE_CURRENT_REGISTER_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            ...testInitialState,
            isPasswordHidden: true,
        })
    })

    it('CHANGE_CURRENT_REGISTER_INPUT_NAME', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_REGISTER_INPUT_NAME,
                newName: "1"
            })
        ).toEqual(
            {
                ...initialState,
                inputs: {
                    email: "",
                    password: "",
                    name: "1",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_NAME,
                    newName: "22"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: testInitialState.inputs.email,
                password: testInitialState.inputs.password,
                name: "22",
            },
        })
    })

    it('CHANGE_CURRENT_REGISTER_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_REGISTER_INPUT_PASSWORD,
                newPassword: "1"
            })
        ).toEqual(
            {
                ...initialState,
                inputs: {
                    email: "",
                    password: "1",
                    name: "",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_PASSWORD,
                    newPassword: "2"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: testInitialState.inputs.email,
                password: "2",
                name: testInitialState.inputs.name,
            },
        })
    })

    it('CHANGE_CURRENT_REGISTER_INPUT_EMAIL', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_REGISTER_INPUT_EMAIL,
                newEmail: "1@1.ru"
            })
        ).toEqual(
            {
                ...initialState,
                inputs: {
                    email: "1@1.ru",
                    password: "",
                    name: "",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_EMAIL,
                    newEmail: "2@2.ru"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "2@2.ru",
                password: testInitialState.inputs.password,
                name: testInitialState.inputs.name,
            },
        })
    })
})
