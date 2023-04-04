import { profileReducer as reducer, initialState } from '../Profile.ts';
import * as types from '../../constants/Profile/Profile';
const testInitialState = {
    inputs: {
        email: "1@1.ru",
        password: "пароль1",
        name: "имя1",
    },
    leggitInputs: {
        leggitEmail: "7@7.ru",
        leggitName: "имя7",
    },
    isGettingProfileInfo: false,
    isSendingNewProfileInfo: false,
};

describe('profile reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('MAKE_PROFILE_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.MAKE_PROFILE_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                isGettingProfileInfo: true,
            }
        )

        expect(
            reducer(
                testInitialState,
                {
                    type: types.MAKE_PROFILE_REQUEST,
                }
            )
        ).toEqual({
            ...testInitialState,
            isGettingProfileInfo: true,
        })
    })

    it('MAKE_PROFILE_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.MAKE_PROFILE_REQUEST_ERROR
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isGettingProfileInfo: true,
                },
                {
                    type: types.MAKE_PROFILE_REQUEST_ERROR,
                }
            )
        ).toEqual(testInitialState)
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
                ...initialState,
                inputs: {
                    email: "1@1.ru",
                    password: "password1",
                    name: "name1",
                },
                leggitInputs: {
                    leggitEmail: "1@1.ru",
                    leggitName: "name1",
                },
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
                    isGettingProfileInfo: true,
                },
                {
                    type: types.MAKE_PROFILE_REQUEST_SUCCES,
                    currentEmail: "2@2.ru",
                    currentName: "name2",
                    currentPassword: "password2",
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "2@2.ru",
                password: "password2",
                name: "name2",
            },
            leggitInputs: {
                leggitEmail: "2@2.ru",
                leggitName: "name2",
            },
        })
    })

    it('UPDATE_PROFILE_REQUEST', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_PROFILE_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                isSendingNewProfileInfo: true,
            }
        )

        expect(
            reducer(testInitialState,
                {
                    type: types.UPDATE_PROFILE_REQUEST,
                }
            )
        ).toEqual({
           ...testInitialState,
            isSendingNewProfileInfo: true,
        })
    })

    it('UPDATE_PROFILE_REQUEST_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_PROFILE_REQUEST_ERROR
            })
        ).toEqual(initialState)

        expect(
            reducer(
                {
                    ...testInitialState,
                    isSendingNewProfileInfo: true,
                },
                {
                    type: types.UPDATE_PROFILE_REQUEST_ERROR,
                }
            )
        ).toEqual(testInitialState)
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
                ...initialState,
                inputs: {
                    email: "8@mail.ru",
                    password: "888",
                    name: "8",
                },
                leggitInputs: {
                    leggitEmail: "8@mail.ru",
                    leggitName: "8",
                },
            }
        )

        expect(
            reducer(
                {
                    ...testInitialState,
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
            ...testInitialState,
            inputs: {
                email: "8@mail.ru",
                password: "",
                name: "8",
            },
            leggitInputs: {
                leggitEmail: "8@mail.ru",
                leggitName: "8",
            },
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
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
                    newEmail: "8@8.ru"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: "8@8.ru",
                password: testInitialState.inputs.password,
                name: testInitialState.inputs.name,
            },
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
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_NAME,
                    newName: "8"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: testInitialState.inputs.email,
                password: testInitialState.inputs.password,
                name: "8",
            },
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
                    type: types.CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
                    newPassword: "8"
                }
            )
        ).toEqual({
            ...testInitialState,
            inputs: {
                email: testInitialState.inputs.email,
                password: "8",
                name: testInitialState.inputs.name,
            },
        })
    })
})
