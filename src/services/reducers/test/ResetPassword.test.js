import { resetPasswordReducer as reducer, initialState } from '../ResetPassword.ts';
import * as types from '../../constants/ResetPassword/ResetPassword';
const testInitialState ={
    inputsPage1ForgotPassword: {
        email: "1@1.ru",
    },
    inputsPage2ResetPassword: {
        password: "пароль1",
        code: "1212",
    },
    isLoadingForgotPassword: false,
    isLoadingResetPassword: false,
    isCodeSend: false,
    isResetSucces: false,
    isPasswordHidden: true,
};

describe('resetPassword reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('FORGOT_PASSWORD_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_START
            })
        ).toEqual(
            {
                ...initialState,
                isLoadingForgotPassword: true,
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.FORGOT_PASSWORD_REQUEST_START,
                }
            )
        ).toEqual({
            ...testInitialState,
            isLoadingForgotPassword: true,
        })
    })

    it('FORGOT_PASSWORD_REQUEST_FAIL', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_FAIL
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLoadingForgotPassword: true,
                },
                {
                    type: types.FORGOT_PASSWORD_REQUEST_FAIL,
                }
            )
        ).toEqual(testInitialState)
    })

    it('FORGOT_PASSWORD_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_SUCCES
            })
        ).toEqual(
            {
                ...initialState,
                isCodeSend: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLoadingForgotPassword: true,
                },
                {
                    type: types.FORGOT_PASSWORD_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            ...testInitialState,
            isCodeSend:true,
            inputsPage1ForgotPassword:initialState.inputsPage1ForgotPassword,
        })
    })

    it('RESET_PASSWORD_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_START
            })
        ).toEqual(
            {
                ...initialState,
                isLoadingResetPassword: true,
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.RESET_PASSWORD_REQUEST_START,
                }
            )
        ).toEqual({
            ...testInitialState,
            isLoadingResetPassword: true,
        })
    })

    it('RESET_PASSWORD_REQUEST_FAIL', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_FAIL
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLoadingResetPassword: true,
                },
                {
                    type: types.RESET_PASSWORD_REQUEST_FAIL,
                }
            )
        ).toEqual(testInitialState)
    })

    it('RESET_PASSWORD_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_SUCCES
            })
        ).toEqual(
            {
                ...initialState,
                isResetSucces: true,
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                },
                {
                    type: types.RESET_PASSWORD_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage2ResetPassword: initialState.inputsPage2ResetPassword,
            isResetSucces: true,
        })
    })

    it('CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage2ResetPassword: {
                password: "",
                code: "",
            },
        })
    })

    it('CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD
            })
        ).toEqual(initialState)

        expect(
            reducer(testInitialState,
                {
                    type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD,
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage1ForgotPassword: {
                email: "",
            },
        })
    })

    it('CHANGE_CURRENT_RESET_INPUT_EMAIL', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_RESET_INPUT_EMAIL,
                newEmail: "2@2.ru"
            })
        ).toEqual(
            {
                ...initialState,
                inputsPage1ForgotPassword: {
                    email: "2@2.ru",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_EMAIL,
                    newEmail: "2@2.ru"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage1ForgotPassword: {
                email: "2@2.ru",
            },
        })
    })

    it('CHANGE_CURRENT_RESET_INPUT_CODE', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_RESET_INPUT_CODE,
                newCode: "1"
            })
        ).toEqual(
            {
                ...initialState,
                inputsPage2ResetPassword: {
                    password: "",
                    code: "1",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_CODE,
                    newCode: "8"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage2ResetPassword: {
                password: testInitialState.inputsPage2ResetPassword.password,
                code: "8",
            },
        })
    })

    it('CHANGE_CURRENT_RESET_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_RESET_INPUT_PASSWORD,
                newPassword: "1"
            })
        ).toEqual(
            {
                ...initialState,
                inputsPage2ResetPassword: {
                    password: "1",
                    code: "",
                },
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_PASSWORD,
                    newPassword: "8"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputsPage2ResetPassword: {
                password: "8",
                code: testInitialState.inputsPage2ResetPassword.code,
            },
        })
    })

    it('HIDE_CURRENT_RESET_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_RESET_INPUT_PASSWORD,
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isPasswordHidden: false,
                },
                {
                    type: types.HIDE_CURRENT_RESET_INPUT_PASSWORD,
                }
            )
        ).toEqual(testInitialState)
    })

    it('SHOW_CURRENT_RESET_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_RESET_INPUT_PASSWORD,
            })
        ).toEqual(
            {
                ...initialState,
                isPasswordHidden: false,
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.SHOW_CURRENT_RESET_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            ...testInitialState,
            isPasswordHidden: false,
        })
    })
})
