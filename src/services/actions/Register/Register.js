//выбранный ингредиент
import { configStandartRequest, requestServer } from "../../../utils/2api/2api";
import { LOGIN_REDIRECTED, LOGIN_REQUEST_SUCCES } from "../Login/Login";

export const CHANGE_CURRENT_REGISTER_INPUT_EMAIL = 'CHANGE_CURRENT_REGISTER_INPUT_EMAIL';
export const CHANGE_CURRENT_REGISTER_INPUT_PASSWORD = 'CHANGE_CURRENT_REGISTER_INPUT_PASSWORD';
export const CHANGE_CURRENT_REGISTER_INPUT_NAME = 'CHANGE_CURRENT_REGISTER_INPUT_NAME';
export const CLEAR_CURRENT_REGISTER_INPUTS = 'CLEAR_CURRENT_REGISTER_INPUTS';
export const SHOW_CURRENT_REGISTER_INPUT_PASSWORD = 'SHOW_CURRENT_REGISTER_INPUT_PASSWORD';
export const HIDE_CURRENT_REGISTER_INPUT_PASSWORD = 'HIDE_CURRENT_REGISTER_INPUT_PASSWORD';
export const REGISTER_REQUEST_START = 'REGISTER_REQUEST_START';
export const REGISTER_REQUEST_SUCCES = 'REGISTER_REQUEST_SUCCES';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

export function makeRegisterRequest(typedEmail, typedName, typedPassword) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST_START
        });
        requestServer("/auth/register", configStandartRequest({ email: typedEmail, password: typedPassword, name: typedName }, "POST"))
            .then(data => {
                dispatch({
                    type: REGISTER_REQUEST_SUCCES,
                });
                dispatch({
                    type: LOGIN_REQUEST_SUCCES,
                    newRefreshToken: data.refreshToken,
                    newAccesToken: data.accessToken
                });
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_REQUEST_FAILED
                });
            })
    };
}

export function changeCurrentRegisterInputEmail(payload) {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentRegisterInputPassword(payload) {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentRegisterInputName(payload) {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_NAME,
        newName: payload,
    };
}
export function hideCurrentRegisterInputPassword() {
    return {
        type: HIDE_CURRENT_REGISTER_INPUT_PASSWORD,
    };
}
export function showCurrentRegisterInputPassword() {
    return {
        type: SHOW_CURRENT_REGISTER_INPUT_PASSWORD,
    };
}
export function clearCurrentRegisterInputs() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_CURRENT_REGISTER_INPUTS,
        });
        dispatch({
            type: LOGIN_REDIRECTED,
        });
    };
}

