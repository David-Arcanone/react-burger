import { loginReducer as reducer, initialState } from '../Login.ts';
import * as types from '../../constants/Login/Login';

const testInitialState = {
    inputs: {
        email: "1@1.ru",
        password: "1111",
    },
    isLoading: false,
    isExiting: false,
    isPasswordHidden: false,
    loginStateChange: false,
    isLogged: true,
    isAuthChecked: true,
};

describe('login reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('LOGOUT_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                isExiting: true
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.LOGOUT_REQUEST,
                }
            )
        ).toEqual({
            ...testInitialState,
            isExiting: true,
        })
    })

    it('LOGOUT_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_SUCCES,
            })
        ).toEqual(
            {
                ...initialState,
                loginStateChange: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isExiting: true,
                },
                {
                    type: types.LOGOUT_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            ...testInitialState,
            loginStateChange: true,
            isLogged: false,
        })
    })

    it('LOGOUT_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_ERROR,
            })
        ).toEqual(
            {
                ...initialState,
                loginStateChange: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isExiting: true,
                },
                {
                    type: types.LOGOUT_REQUEST_ERROR,
                }
            )
        ).toEqual({
            ...testInitialState,
            loginStateChange: true,
            isLogged: false,
        })
    })

    it('LOGIN_RELOGIN', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_RELOGIN,
            })
        ).toEqual(
            {
                ...initialState,
                isLogged: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLogged: false,
                },
                {
                    type: types.LOGIN_RELOGIN,
                }
            )
        ).toEqual(testInitialState)
    })

    it('LOGIN_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                isLoading: true,
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.LOGIN_REQUEST,
                }
            )
        ).toEqual({
            ...testInitialState,
            isLoading: true,
        })
    })

    it('LOGIN_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_ERROR,
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLoading: true,
                },
                {
                    type: types.LOGIN_REQUEST_ERROR,
                }
            )
        ).toEqual(testInitialState)
    })

    it('LOGIN_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_SUCCES,
            })
        ).toEqual(
            {
                ...initialState,
                loginStateChange: true,
                isLogged: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    loginStateChange: true,
                    isLogged: false,
                    isLoading: true
                },
                {
                    type: types.LOGIN_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            ...testInitialState,
            loginStateChange: true,
        })
    })

    it('CLEAR_CURRENT_LOGIN_INPUTS', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_LOGIN_INPUTS,
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    loginStateChange: true
                },
                {
                    type: types.CLEAR_CURRENT_LOGIN_INPUTS,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: initialState.inputs
        })
    })

    it('CHANGE_CURRENT_LOGIN_INPUT_EMAIL', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
                newEmail: "11@mail.ru"
            })
        ).toEqual(
            {
                ...initialState,
                inputs: {
                    email: "11@mail.ru",
                    password: "",
                },
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
                    newEmail: "22@mail.ru"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "22@mail.ru",
                password: testInitialState.inputs.password,
            },
        })
    })

    it('CHANGE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
                newPassword: "11"
            })
        ).toEqual(
            {
                ...initialState,
                inputs: {
                    email: "",
                    password: "11",
                },
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
                    newPassword: "22"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: testInitialState.inputs.email,
                password: "22",
            },
        })
    })

    it('SHOW_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
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
                    type: types.SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
                }
            )
        ).toEqual(testInitialState)
    })

    it('HIDE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
            })
        ).toEqual(initialState)

        expect(
            reducer(
                testInitialState,
                {
                    type: types.HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            ...testInitialState,
            isPasswordHidden: true,
        })
    })

    it('TRACK_LOGIN', () => {
        expect(
            reducer(undefined, {
                type: types.TRACK_LOGIN,
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    loginStateChange: true,
                },
                {
                    type: types.TRACK_LOGIN,
                }
            )
        ).toEqual(testInitialState)
    })

    it('AUTH_CHECKED', () => {
        expect(
            reducer(undefined, {
                type: types.AUTH_CHECKED,
            })
        ).toEqual(
            {
                ...initialState,
                isAuthChecked: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isAuthChecked: false,
                },
                {
                    type: types.AUTH_CHECKED,
                }
            )
        ).toEqual(testInitialState)
    })
})