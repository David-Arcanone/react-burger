import { registerReducer as reducer } from '../Register.ts';
import * as types from '../../constants/Register/Register';

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            inputs: {
                email: "",
                password: "",
                name: "",
            },
            isRequesting: false,
            isPasswordHidden: true,
        })
    })

    it('REGISTER_REQUEST_START', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_START
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: true,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: false,
                    isPasswordHidden: false,
                },
                {
                    type: types.REGISTER_REQUEST_START,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1",
                name: "11",
            },
            isRequesting: true,
            isPasswordHidden: false,
        })
    })

    it('REGISTER_REQUEST_FAILED', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_FAILED
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: true,
                },
                {
                    type: types.REGISTER_REQUEST_FAILED,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1",
                name: "11",
            },
            isRequesting: false,
            isPasswordHidden: true,
        })
    })

    it('REGISTER_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_SUCCES
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: true,
                },
                {
                    type: types.REGISTER_REQUEST_SUCCES,
                }
            )
        ).toEqual({
            inputs: {
                email: "",
                password: "",
                name: "",
            },
            isRequesting: false,
            isPasswordHidden: true,
        })
    })

    it('CLEAR_CURRENT_REGISTER_INPUTS', () => {
        expect(
            reducer(undefined, {
                type: types.CLEAR_CURRENT_REGISTER_INPUTS
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: false,
                },
                {
                    type: types.CLEAR_CURRENT_REGISTER_INPUTS,
                }
            )
        ).toEqual({
            inputs: {
                email: "",
                password: "",
                name: "",
            },
            isRequesting: true,
            isPasswordHidden: false,
        })
    })

    it('SHOW_CURRENT_REGISTER_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.SHOW_CURRENT_REGISTER_INPUT_PASSWORD
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: true,
                },
                {
                    type: types.SHOW_CURRENT_REGISTER_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1",
                name: "11",
            },
            isRequesting: true,
            isPasswordHidden: false,
        })
    })

    it('HIDE_CURRENT_REGISTER_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.HIDE_CURRENT_REGISTER_INPUT_PASSWORD
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: false,
                },
                {
                    type: types.HIDE_CURRENT_REGISTER_INPUT_PASSWORD,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1",
                name: "11",
            },
            isRequesting: true,
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
                inputs: {
                    email: "",
                    password: "",
                    name: "1",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: false,
                },
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_NAME,
                    newName: "22"
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "1",
                name: "22",
            },
            isRequesting: true,
            isPasswordHidden: false,
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
                inputs: {
                    email: "",
                    password: "1",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: false,
                },
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_PASSWORD,
                    newPassword: "2"
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "11",
            },
            isRequesting: true,
            isPasswordHidden: false,
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
                inputs: {
                    email: "1@1.ru",
                    password: "",
                    name: "",
                },
                isRequesting: false,
                isPasswordHidden: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "1",
                        name: "11",
                    },
                    isRequesting: true,
                    isPasswordHidden: false,
                },
                {
                    type: types.CHANGE_CURRENT_REGISTER_INPUT_EMAIL,
                    newEmail: "2@2.ru"
                }
            )
        ).toEqual({
            inputs: {
                email: "2@2.ru",
                password: "1",
                name: "11",
            },
            isRequesting: true,
            isPasswordHidden: false,
        })
    })
})
