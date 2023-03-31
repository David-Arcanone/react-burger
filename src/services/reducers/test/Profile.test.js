import { profileReducer as reducer } from '../Profile.ts';
import * as types from '../../constants/Profile/Profile';

describe('profile reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            inputs: {
                email: "",
                password: "",
                name: "",
            },
            leggitInputs: {
                leggitEmail: "",
                leggitName: "",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('MAKE_PROFILE_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.MAKE_PROFILE_REQUEST
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: true,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.MAKE_PROFILE_REQUEST,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: true,
            isSendingNewProfileInfo: false,
        })
    })

    it('MAKE_PROFILE_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.MAKE_PROFILE_REQUEST_ERROR
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: true,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.MAKE_PROFILE_REQUEST_ERROR,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('MAKE_PROFILE_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.MAKE_PROFILE_REQUEST_SUCCES,
                currentEmail: "1@1.ru",
                currentName: "name1",
                currentPassword: "password1",
            })
        ).toEqual(
            {
                inputs: {
                    email: "1@1.ru",
                    password: "password1",
                    name: "name1",
                },
                leggitInputs: {
                    leggitEmail: "1@1.ru",
                    leggitName: "name1",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "8@8.ru",
                        password: "8",
                        name: "8",
                    },
                    leggitInputs: {
                        leggitEmail: "8@8.ru",
                        leggitName: "8",
                    },
                    isGettingProfileInfo: true,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.MAKE_PROFILE_REQUEST_SUCCES,
                    currentEmail: "1@1.ru",
                    currentName: "name1",
                    currentPassword: "password1",
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "password1",
                name: "name1",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "name1",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('UPDATE_PROFILE_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_PROFILE_REQUEST
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: true,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.UPDATE_PROFILE_REQUEST,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: true,
        })
    })

    it('UPDATE_PROFILE_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_PROFILE_REQUEST_ERROR
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: true,
                },
                {
                    type: types.UPDATE_PROFILE_REQUEST_ERROR,
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('UPDATE_PROFILE_REQUEST_SUCCES', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_PROFILE_REQUEST_SUCCES,
                currentEmail: "8@mail.ru",
                currentName: "8",
                currentPassword: "888",
            })
        ).toEqual(
            {
                inputs: {
                    email: "8@mail.ru",
                    password: "888",
                    name: "8",
                },
                leggitInputs: {
                    leggitEmail: "8@mail.ru",
                    leggitName: "8",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: true,
                },
                {
                    type: types.UPDATE_PROFILE_REQUEST_SUCCES,
                    currentEmail: "8@mail.ru",
                    currentName: "8",
                    currentPassword: "",
                }
            )
        ).toEqual({
            inputs: {
                email: "8@mail.ru",
                password: "",
                name: "8",
            },
            leggitInputs: {
                leggitEmail: "8@mail.ru",
                leggitName: "8",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('CHANGE_CURRENT_PROFILE_INPUT_EMAIL', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
                newEmail: "1@1.ru"
            })
        ).toEqual(
            {
                inputs: {
                    email: "1@1.ru",
                    password: "",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
                    newEmail: "8@8.ru"
                }
            )
        ).toEqual({
            inputs: {
                email: "8@8.ru",
                password: "2",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('CHANGE_CURRENT_PROFILE_INPUT_NAME', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_PROFILE_INPUT_NAME,
                newName: "1"
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "",
                    name: "1",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_NAME,
                    newName: "8"
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "2",
                name: "8",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })

    it('CHANGE_CURRENT_PROFILE_INPUT_PASSWORD', () => {
        expect(
            reducer(undefined, {
                type: types.CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
                newPassword: "1"
            })
        ).toEqual(
            {
                inputs: {
                    email: "",
                    password: "1",
                    name: "",
                },
                leggitInputs: {
                    leggitEmail: "",
                    leggitName: "",
                },
                isGettingProfileInfo: false,
                isSendingNewProfileInfo: false,
            }
        )

        expect(
            reducer(
                {
                    inputs: {
                        email: "1@1.ru",
                        password: "2",
                        name: "3",
                    },
                    leggitInputs: {
                        leggitEmail: "1@1.ru",
                        leggitName: "3",
                    },
                    isGettingProfileInfo: false,
                    isSendingNewProfileInfo: false,
                },
                {
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
                    newPassword: "8"
                }
            )
        ).toEqual({
            inputs: {
                email: "1@1.ru",
                password: "8",
                name: "3",
            },
            leggitInputs: {
                leggitEmail: "1@1.ru",
                leggitName: "3",
            },
            isGettingProfileInfo: false,
            isSendingNewProfileInfo: false,
        })
    })
})
