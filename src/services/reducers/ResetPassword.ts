import { TResetPasswordActions } from "../actions/ResetPassword/ResetPassword";
import { CHANGE_CURRENT_RESET_INPUT_CODE, CHANGE_CURRENT_RESET_INPUT_EMAIL, CHANGE_CURRENT_RESET_INPUT_PASSWORD, CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD, CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD, FORGOT_PASSWORD_REQUEST_FAIL, FORGOT_PASSWORD_REQUEST_START, FORGOT_PASSWORD_REQUEST_SUCCES, HIDE_CURRENT_RESET_INPUT_PASSWORD, RESET_PASSWORD_REQUEST_FAIL, RESET_PASSWORD_REQUEST_START, RESET_PASSWORD_REQUEST_SUCCES, SHOW_CURRENT_RESET_INPUT_PASSWORD } from "../constants/ResetPassword/ResetPassword";
import { IResetPasswordState } from "../types/Reset/Reset";

const initialState: IResetPasswordState = {
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
};

export const resetPasswordReducer = (state = initialState, action:TResetPasswordActions):IResetPasswordState => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST_START: {
            return {
                ...state,
                isLoadingForgotPassword: true,
            };
        }
        case FORGOT_PASSWORD_REQUEST_FAIL: {
            return {
                ...state,
                isLoadingForgotPassword: false,
            };
        }
        case FORGOT_PASSWORD_REQUEST_SUCCES: {
            return {
                ...state,
                isLoadingForgotPassword: false,
                isCodeSend: true,
                inputsPage1ForgotPassword: initialState.inputsPage1ForgotPassword,
            };
        }
        case RESET_PASSWORD_REQUEST_START: {
            return {
                ...state,
                isLoadingResetPassword: true,
            };
        }
        case RESET_PASSWORD_REQUEST_FAIL: {
            return {
                ...state,
                isLoadingResetPassword: false,
            };
        }
        case RESET_PASSWORD_REQUEST_SUCCES: {
            return {
                ...state,
                isLoadingResetPassword: false,
                isCodeSend: false,
                isResetSucces: true,
                inputsPage2ResetPassword: initialState.inputsPage2ResetPassword,
            };
        }
        case CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD: {
            return {
                ...state,
                inputsPage1ForgotPassword: initialState.inputsPage1ForgotPassword,
            };
        }
        case CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD: {
            return {
                ...state,
                inputsPage2ResetPassword: initialState.inputsPage2ResetPassword,
                //isCodeSend: false, //из-за React-18, убрал 
                isResetSucces: false,
            };
        }
        case CHANGE_CURRENT_RESET_INPUT_EMAIL: {
            return {
                ...state,
                inputsPage1ForgotPassword: { email: action.newEmail },
            };
        }
        case CHANGE_CURRENT_RESET_INPUT_CODE: {
            return {
                ...state,
                inputsPage2ResetPassword: { ...state.inputsPage2ResetPassword, code: action.newCode },
            };
        }
        case CHANGE_CURRENT_RESET_INPUT_PASSWORD: {
            return {
                ...state,
                inputsPage2ResetPassword: { ...state.inputsPage2ResetPassword, password: action.newPassword },
            };
        }
        case SHOW_CURRENT_RESET_INPUT_PASSWORD: {
            return {
                ...state,
                isPasswordHidden: false,
            };
        }
        case HIDE_CURRENT_RESET_INPUT_PASSWORD: {
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