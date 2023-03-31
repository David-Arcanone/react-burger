import { resetPasswordReducer as reducer } from '../ResetPassword.ts';
import * as types from '../../constants/ResetPassword/ResetPassword';

describe('resetPassword reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            inputsPage1ForgotPassword: {
                email: "",
            },
            inputsPage2ResetPassword: {
                password: "",
                code: "",
            },
            isLoadingForgotPassword: false,
            isLoadingResetPassword: false,
            isCodeSend: false,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('FORGOT_PASSWORD_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_START
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: true,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: false,
                    isLoadingResetPassword: false,
                    isCodeSend: false,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.FORGOT_PASSWORD_REQUEST_START,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: false,
            isCodeSend: false,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('FORGOT_PASSWORD_REQUEST_FAIL', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_FAIL
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: false,
                    isCodeSend: false,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.FORGOT_PASSWORD_REQUEST_FAIL,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: false,
            isLoadingResetPassword: false,
            isCodeSend: false,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('FORGOT_PASSWORD_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST_SUCCES
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: true,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: false,
                    isCodeSend: false,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.FORGOT_PASSWORD_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: false,
            isLoadingResetPassword: false,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('RESET_PASSWORD_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_START
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: true,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: false,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.RESET_PASSWORD_REQUEST_START,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('RESET_PASSWORD_REQUEST_FAIL', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_FAIL
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.RESET_PASSWORD_REQUEST_FAIL,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: false,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('RESET_PASSWORD_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST_SUCCES
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: true,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.RESET_PASSWORD_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "",
                code: "",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: false,
            isCodeSend: false,
            isResetSucces: true,
            isPasswordHidden: true,
        })
    })

    it('CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "",
                code: "",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
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
                inputsPage1ForgotPassword: {
                    email: "2@2.ru",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_EMAIL,
                    newEmail: "2@2.ru"
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "2@2.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
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
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "1",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_CODE,
                    newCode: "8"
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "8",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
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
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "1",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.CHANGE_CURRENT_RESET_INPUT_PASSWORD,
                    newPassword: "8"
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "8",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('HIDE_CURRENT_RESET_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_RESET_INPUT_PASSWORD,
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: false,
                },
                {
                    type: types.HIDE_CURRENT_RESET_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: true,
        })
    })

    it('SHOW_CURRENT_RESET_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_RESET_INPUT_PASSWORD,
            })
        ).toEqual(
            {
                inputsPage1ForgotPassword: {
                    email: "",
                },
                inputsPage2ResetPassword: {
                    password: "",
                    code: "",
                },
                isLoadingForgotPassword: false,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: false,
                isPasswordHidden: false,
            }
        )

        expect(
            reducer(
                {
                    inputsPage1ForgotPassword: {
                        email: "1@1.ru",
                    },
                    inputsPage2ResetPassword: {
                        password: "1",
                        code: "1212",
                    },
                    isLoadingForgotPassword: true,
                    isLoadingResetPassword: true,
                    isCodeSend: true,
                    isResetSucces: false,
                    isPasswordHidden: true,
                },
                {
                    type: types.SHOW_CURRENT_RESET_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputsPage1ForgotPassword: {
                email: "1@1.ru",
            },
            inputsPage2ResetPassword: {
                password: "1",
                code: "1212",
            },
            isLoadingForgotPassword: true,
            isLoadingResetPassword: true,
            isCodeSend: true,
            isResetSucces: false,
            isPasswordHidden: false,
        })
    })
})
