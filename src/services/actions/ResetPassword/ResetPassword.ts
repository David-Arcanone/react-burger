import { configStandartRequest, requestServer } from "../../../utils/api/api";
import { CHANGE_CURRENT_RESET_INPUT_CODE, CHANGE_CURRENT_RESET_INPUT_EMAIL, CHANGE_CURRENT_RESET_INPUT_PASSWORD, CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD, CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD, FORGOT_PASSWORD_REQUEST_FAIL, FORGOT_PASSWORD_REQUEST_START, FORGOT_PASSWORD_REQUEST_SUCCES, HIDE_CURRENT_RESET_INPUT_PASSWORD, RESET_PASSWORD_REQUEST_FAIL, RESET_PASSWORD_REQUEST_START, RESET_PASSWORD_REQUEST_SUCCES, SHOW_CURRENT_RESET_INPUT_PASSWORD } from "../../constants/ResetPassword/ResetPassword";
import { AppDispatch, AppThunk } from "../../types";
import { TRequestBodyForgotPassword, TRequestBodyResetPassword, TRequestDataForgotPassword, TRequestDataResetPassword } from "../../types/api/api";

export interface IChangeCurrentResetInputEmail {
    type: typeof CHANGE_CURRENT_RESET_INPUT_EMAIL;
    newEmail: string;
};
export interface IChangeCurrentResetInputPassword {
    type: typeof CHANGE_CURRENT_RESET_INPUT_PASSWORD;
    newPassword: string;
};
export interface IChangeCurrentResetInputCode {
    type: typeof CHANGE_CURRENT_RESET_INPUT_CODE;
    newCode: string;
};
export interface IClearCurrentResetInputsPage1ForgotPassword {
    type: typeof CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD;
};
export interface IClearCurrentResetInputsPage2ResetPassword {
    type: typeof CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD;
};

export interface IShowCurrentResetInputsPassword {
    type: typeof SHOW_CURRENT_RESET_INPUT_PASSWORD;
};
export interface IHideCurrentResetInputsPassword {
    type: typeof HIDE_CURRENT_RESET_INPUT_PASSWORD;
};
export interface IForgotPasswordRequestStart {
    type: typeof FORGOT_PASSWORD_REQUEST_START;
};
export interface IForgotPasswordRequestSucces {
    type: typeof FORGOT_PASSWORD_REQUEST_SUCCES;
};
export interface IForgotPasswordRequestFail {
    type: typeof FORGOT_PASSWORD_REQUEST_FAIL;
};
export interface IResetPasswordRequestStart {
    type: typeof RESET_PASSWORD_REQUEST_START;
};
export interface IResetPasswordRequestSucces {
    type: typeof RESET_PASSWORD_REQUEST_SUCCES;
};
export interface IResetPasswordRequestFail {
    type: typeof RESET_PASSWORD_REQUEST_FAIL;
};

export type TResetPasswordActions = IHideCurrentResetInputsPassword
    | IShowCurrentResetInputsPassword
    | IClearCurrentResetInputsPage2ResetPassword
    | IClearCurrentResetInputsPage1ForgotPassword
    | IChangeCurrentResetInputCode
    | IChangeCurrentResetInputEmail
    | IChangeCurrentResetInputPassword
    | IForgotPasswordRequestStart
    | IForgotPasswordRequestSucces
    | IForgotPasswordRequestFail
    | IResetPasswordRequestStart
    | IResetPasswordRequestSucces
    | IResetPasswordRequestFail;

export const makeForgotPasswordRequest: AppThunk = (typedEmail: string) => (dispatch: AppDispatch)=> {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST_START
    });
    requestServer<TRequestDataResetPassword>("/password-reset", configStandartRequest<TRequestBodyForgotPassword>({ email: typedEmail }, "POST")).then(data => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST_SUCCES,
        });
    })
        .catch(() => {
            console.log("Ошибка сброса отправки кода сброса");
            dispatch({
                type: FORGOT_PASSWORD_REQUEST_FAIL
            });
        })
};


export const makeResetPasswordRequest: AppThunk = (newPassword: string, code: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST_START
    });
    requestServer<TRequestDataForgotPassword>("/password-reset/reset", configStandartRequest<TRequestBodyResetPassword>({ password: newPassword, token: code }, "POST")).then(data => {
        dispatch({
            type: RESET_PASSWORD_REQUEST_SUCCES,
        });
    })
        .catch(() => {
            console.log("Ошибка сброса пароля");
            dispatch({
                type: RESET_PASSWORD_REQUEST_FAIL
            });
        })
};


export function changeCurrentResetInputEmail(payload: string): IChangeCurrentResetInputEmail {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentResetInputPassword(payload: string): IChangeCurrentResetInputPassword {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentResetInputCode(payload: string): IChangeCurrentResetInputCode {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_CODE,
        newCode: payload,
    };
}
export function clearCurrentResetInputsPage1ForgotPassword(): IClearCurrentResetInputsPage1ForgotPassword {
    return {
        type: CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD,
    };
}
export function clearCurrentResetInputsPage2ResetPassword(): IClearCurrentResetInputsPage2ResetPassword {
    return {
        type: CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD,
    };
}
export function showCurrentResetInputsPassword(): IShowCurrentResetInputsPassword {
    return {
        type: SHOW_CURRENT_RESET_INPUT_PASSWORD,
    };
}
export function hideCurrentResetInputsPassword(): IHideCurrentResetInputsPassword {
    return {
        type: HIDE_CURRENT_RESET_INPUT_PASSWORD,
    };
}