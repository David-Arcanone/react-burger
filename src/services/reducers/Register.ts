import { TRegisterActions } from "../actions/Register/Register";
import { CHANGE_CURRENT_REGISTER_INPUT_EMAIL, CHANGE_CURRENT_REGISTER_INPUT_NAME, CHANGE_CURRENT_REGISTER_INPUT_PASSWORD, CLEAR_CURRENT_REGISTER_INPUTS, HIDE_CURRENT_REGISTER_INPUT_PASSWORD, REGISTER_REQUEST_FAILED, REGISTER_REQUEST_START, REGISTER_REQUEST_SUCCES, SHOW_CURRENT_REGISTER_INPUT_PASSWORD } from "../constants/Register/Register";
import { IRegisterState } from "../types/Register/Register";

const initialState:IRegisterState = {
    inputs: {
        email: "",
        password: "",
        name: "",
    },
    isRequesting: false,
    isPasswordHidden: true,
};

export const registerReducer = (state = initialState, action: TRegisterActions):IRegisterState => {
    switch (action.type) {
        case REGISTER_REQUEST_START: {
            return {
                ...state,
                isRequesting: true,
            };
        }
        case REGISTER_REQUEST_FAILED: {
            return {
                ...state,
                isRequesting: false,
            };
        }
        case REGISTER_REQUEST_SUCCES: {
            return {
                ...state,
                inputs: initialState.inputs,
                isRequesting: false,
            };
        }
        
        case CLEAR_CURRENT_REGISTER_INPUTS: {
            return {
                ...state,
                inputs: initialState.inputs,
            };
        }
        case CHANGE_CURRENT_REGISTER_INPUT_EMAIL: {
            return {
                ...state,
                inputs: { ...state.inputs, email: action.newEmail },
            };
        }
        case CHANGE_CURRENT_REGISTER_INPUT_PASSWORD: {
            return {
                ...state,
                inputs: { ...state.inputs, password: action.newPassword },
            };
        }
        case CHANGE_CURRENT_REGISTER_INPUT_NAME: {
            return {
                ...state,
                inputs: { ...state.inputs, name: action.newName },
            };
        }
        case SHOW_CURRENT_REGISTER_INPUT_PASSWORD: {
            return {
                ...state,
                isPasswordHidden: false,
            };
        }
        case HIDE_CURRENT_REGISTER_INPUT_PASSWORD: {
            return {
                ...state,
                isPasswordHidden: true,
            };
        }
        default: {
            return state;
        }
    }
};