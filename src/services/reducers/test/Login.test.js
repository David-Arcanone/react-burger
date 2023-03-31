import { loginReducer as reducer } from '../Login.ts';
import * as types from '../../constants/Login/Login';

describe('login reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            inputs: {
                email: "",
                password: "",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('LOGOUT_REQUEST', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: true,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,

            }
        )

        expect(
            reducer(
                {
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

                },
                {
                    type: types.LOGOUT_REQUEST,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1111",
            },
            isLoading: false,
            isExiting: true,
            isPasswordHidden: false,
            loginStateChange: false,
            isLogged: true,
            isAuthChecked: true,

        })
    })

    it('LOGOUT_REQUEST_SUCCES', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_SUCCES,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isPasswordHidden: true,
                isLogged: false,
                isAuthChecked: false,
                isExiting: false,
                loginStateChange: true,

            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1111",
                    },
                    isLoading: false,
                    isExiting: true,
                    isPasswordHidden: false,
                    loginStateChange: true,
                    isLogged: false,
                    isAuthChecked: true,
                },
                {
                    type: types.LOGOUT_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1111",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: true,
            isLogged: false,
            isAuthChecked: true,
        })
    })

    it('LOGOUT_REQUEST_ERROR', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_ERROR,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isPasswordHidden: true,
                isLogged: false,
                isAuthChecked: false,
                isExiting: false,
                loginStateChange: true,

            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1111",
                    },
                    isLoading: false,
                    isExiting: true,
                    isPasswordHidden: false,
                    loginStateChange: true,
                    isLogged: false,
                    isAuthChecked: true,
                },
                {
                    type: types.LOGOUT_REQUEST_ERROR,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1111",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: true,
            isLogged: false,
            isAuthChecked: true,
        })
    })

    it('LOGIN_RELOGIN', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGIN_RELOGIN,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: true,
                isAuthChecked: false,

            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1111",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: false,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: true,

                },
                {
                    type: types.LOGIN_RELOGIN,
                }
            )
        ).toEqual({

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

        })
    })

    it('LOGIN_REQUEST', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: true,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11@mail.ru",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: false,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.LOGIN_REQUEST,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11@mail.ru",
            },
            isLoading: true,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('LOGIN_REQUEST_ERROR', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_ERROR,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11@mail.ru",
                    },
                    isLoading: true,
                    isExiting: false,
                    isPasswordHidden: false,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.LOGIN_REQUEST_ERROR,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11@mail.ru",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('LOGIN_REQUEST_SUCCES', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_SUCCES,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: true,
                isLogged: true,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11@mail.ru",
                    },
                    isLoading: true,
                    isExiting: false,
                    isPasswordHidden: false,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.LOGIN_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11@mail.ru",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: true,
            isLogged: true,
            isAuthChecked: false,
        })
    })


    it('CLEAR_CURRENT_LOGIN_INPUTS', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_LOGIN_INPUTS,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11@mail.ru",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: true,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.CLEAR_CURRENT_LOGIN_INPUTS,
                }
            )
        ).toEqual({
            inputs: {
                email: "",
                password: "",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })


    it('CHANGE_CURRENT_LOGIN_INPUT_EMAIL', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
                newEmail: "11@mail.ru"
            })
        ).toEqual(
            {
                inputs: {
                    email: "11@mail.ru",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
                    newEmail: "22@mail.ru"
                }
            )
        ).toEqual({
            inputs: {
                email: "22@mail.ru",
                password: "11",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })


    it('CHANGE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
                newPassword: "11"
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "11",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
                    newPassword: "22"
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "22",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })



    it('SHOW_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: false,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: false,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('HIDE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: false,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('HIDE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.TRACK_LOGIN,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: true,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.TRACK_LOGIN,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: false,
        })
    })

    it('HIDE_CURRENT_LOGIN_INPUT_PASSWORD', () => {
        //не удаляет несуществующее
        expect(
            reducer(undefined, {
                type: types.AUTH_CHECKED,
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                },
                isLoading: false,
                isExiting: false,
                isPasswordHidden: true,
                loginStateChange: false,
                isLogged: false,
                isAuthChecked: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "11@mail.ru",
                        password: "11",
                    },
                    isLoading: false,
                    isExiting: false,
                    isPasswordHidden: true,
                    loginStateChange: false,
                    isLogged: false,
                    isAuthChecked: false,
                },
                {
                    type: types.AUTH_CHECKED,
                }
            )
        ).toEqual({
            inputs: {
                email: "11@mail.ru",
                password: "11",
            },
            isLoading: false,
            isExiting: false,
            isPasswordHidden: true,
            loginStateChange: false,
            isLogged: false,
            isAuthChecked: true,
        })
    })
})