//выбранный ингредиент

import { configStandartRequest, requestServer } from "../../../utils/2api/2api";

export const CHANGE_CURRENT_RESET_INPUT_EMAIL = 'CHANGE_CURRENT_RESET_INPUT_EMAIL';
export const CHANGE_CURRENT_RESET_INPUT_PASSWORD = 'CHANGE_CURRENT_RESET_INPUT_PASSWORD';
export const CHANGE_CURRENT_RESET_INPUT_CODE = 'CHANGE_CURRENT_RESET_INPUT_CODE';
export const SHOW_CURRENT_RESET_INPUT_PASSWORD = 'SHOW_CURRENT_RESET_INPUT_PASSWORD';
export const HIDE_CURRENT_RESET_INPUT_PASSWORD = 'HIDE_CURRENT_RESET_INPUT_PASSWORD';
export const CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD = 'CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD';
export const CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD = 'CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD';
export const FORGOT_PASSWORD_REQUEST_START = 'FORGOT_PASSWORD_REQUEST_START';
export const FORGOT_PASSWORD_REQUEST_FAIL = 'FORGOT_PASSWORD_REQUEST_FAIL';
export const FORGOT_PASSWORD_REQUEST_SUCCES = 'FORGOT_PASSWORD_REQUEST_SUCCES';
export const RESET_PASSWORD_REQUEST_START = 'RESET_PASSWORD_REQUEST_START';
export const RESET_PASSWORD_REQUEST_FAIL = 'RESET_PASSWORD_REQUEST_FAIL';
export const RESET_PASSWORD_REQUEST_SUCCES = 'RESET_PASSWORD_REQUEST_SUCCES';



export function makeForgotPasswordRequest(typedEmail) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST_START
        });
        requestServer("/password-reset", configStandartRequest({ email: typedEmail }, "POST")).then(data => {
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
}
export function makeResetPasswordRequest(newPassword, code) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST_START
        });
        requestServer("/password-reset/reset", configStandartRequest({ password: newPassword, token: code }, "POST")).then(data => {
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
}






export function changeCurrentResetInputEmail(payload) {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentResetInputPassword(payload) {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentResetInputCode(payload) {
    return {
        type: CHANGE_CURRENT_RESET_INPUT_CODE,
        newCode: payload,
    };
}
export function clearCurrentResetInputsPage1ForgotPassword() {
    return {
        type: CLEAR_CURRENT_RESET_INPUTS_PAGE1_FORGOT_PASSWORD,
    };
}
export function clearCurrentResetInputsPage2ResetPassword() {
    return {
        type: CLEAR_CURRENT_RESET_INPUTS_PAGE2_RESET_PASSWORD,
    };
}
export function showCurrentResetInputsPassword() {
    return {
        type: SHOW_CURRENT_RESET_INPUT_PASSWORD,
    };
}
export function hideCurrentResetInputsPassword() {
    return {
        type: HIDE_CURRENT_RESET_INPUT_PASSWORD,
    };
}