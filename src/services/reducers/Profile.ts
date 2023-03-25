
import { TProfileActions } from "../actions/Profile/Profile";
import {
    CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
    CHANGE_CURRENT_PROFILE_INPUT_NAME,
    CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
    MAKE_PROFILE_REQUEST,
    MAKE_PROFILE_REQUEST_ERROR,
    MAKE_PROFILE_REQUEST_SUCCES,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_REQUEST_ERROR,
    UPDATE_PROFILE_REQUEST_SUCCES
} from "../constants/Profile/Profile";
import { IProfileState } from "../types/Profile/Profile";

const initialState: IProfileState = {
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
};

export const profileReducer = (state = initialState, action: TProfileActions): IProfileState => {
    switch (action.type) {
        case MAKE_PROFILE_REQUEST: {
            return {
                ...state,
                isGettingProfileInfo: true,
            };
        }
        case MAKE_PROFILE_REQUEST_SUCCES: {
            return {
                ...state,
                isGettingProfileInfo: false,
                inputs: {
                    email: action.currentEmail,
                    name: action.currentName,
                    password: action.currentPassword
                },
                leggitInputs: {
                    leggitEmail: action.currentEmail,
                    leggitName: action.currentName,
                }
            };
        }
        case MAKE_PROFILE_REQUEST_ERROR: {
            return {
                ...state,
                isGettingProfileInfo: false,
            };
        }
        case UPDATE_PROFILE_REQUEST: {
            return {
                ...state,
                isSendingNewProfileInfo: true,
            };
        }

        case UPDATE_PROFILE_REQUEST_ERROR: {
            return {
                ...state,
                isSendingNewProfileInfo: false,
            };
        }
        case UPDATE_PROFILE_REQUEST_SUCCES: {
            return {
                ...state,
                isSendingNewProfileInfo: false,
                inputs: {
                    ...state.inputs,
                    email: action.currentEmail,
                    name: action.currentName,
                    password: action.currentPassword
                },
                leggitInputs: {
                    ...state.leggitInputs,
                    leggitEmail: action.currentEmail,
                    leggitName: action.currentName,
                }
            };
        }
        case CHANGE_CURRENT_PROFILE_INPUT_EMAIL: {
            return {
                ...state,
                inputs: { ...state.inputs, email: action.newEmail },
            };
        }
        case CHANGE_CURRENT_PROFILE_INPUT_PASSWORD: {
            return {
                ...state,
                inputs: { ...state.inputs, password: action.newPassword },
            };
        }
        case CHANGE_CURRENT_PROFILE_INPUT_NAME: {
            return {
                ...state,
                inputs: { ...state.inputs, name: action.newName },
            };
        }
        default: {
            return state;
        }
    }
};