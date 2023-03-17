import {
    CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
    CHANGE_CURRENT_PROFILE_INPUT_NAME,
    CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCES,
    PROFILE_REQUEST_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_REQUEST_ERROR,
    UPDATE_PROFILE_REQUEST_SUCCES,
} from "../actions/Profile/Profile";

const initialState = {
    inputs: {
        email: "",
        password: "",
        name: "",
    },
   leggitInputs: {
        leggitEmail: "",
        legitName: "",
    },
    isGettingProfileInfo: false,
    isSendingNewProfileInfo: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_REQUEST: {
            return {
                ...state,
                isGettingProfileInfo: true,
            };
        }
        case PROFILE_REQUEST_SUCCES: {
            return {
                ...state,
                isGettingProfileInfo: false,
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
        case PROFILE_REQUEST_ERROR: {
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