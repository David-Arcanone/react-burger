import { configAdvancedRequest, configStandartRequest, requestServer, requestServerWithRefresh } from "../../../utils/2api/2api";
export const CHANGE_CURRENT_LOGIN_INPUT_EMAIL = 'CHANGE_CURRENT_LOGIN_INPUT_EMAIL';
export const CHANGE_CURRENT_LOGIN_INPUT_PASSWORD = 'CHANGE_CURRENT_LOGIN_INPUT_PASSWORD';
export const SHOW_CURRENT_LOGIN_INPUT_PASSWORD = 'SHOW_CURRENT_LOGIN_INPUT_PASSWORD';
export const HIDE_CURRENT_LOGIN_INPUT_PASSWORD = 'HIDE_CURRENT_LOGIN_INPUT_PASSWORD';
export const CLEAR_CURRENT_LOGIN_INPUTS = 'CLEAR_CURRENT_LOGIN_INPUTS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCES = 'LOGIN_REQUEST_SUCCES';
export const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCES = 'LOGOUT_REQUEST_SUCCES';
export const LOGOUT_REQUEST_ERROR = 'LOGOUT_REQUEST_ERROR';
export const LOGIN_REDIRECTED = 'LOGIN_REDIRECTED';


export function makeLoginRequest(typedEmail, typedPassword) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        requestServer("/auth/login", configStandartRequest({ email: typedEmail, password: typedPassword }, "POST")).then(data => {
            dispatch({
                type: LOGIN_REQUEST_SUCCES,
                newRefreshToken: data.refreshToken,
                newAccesToken: data.accessToken
            });
        })
            .catch(() => {
                console.log("Ошибка входа");
                dispatch({
                    type: LOGIN_REQUEST_ERROR
                });
            })
    };
}
export function makeLogOut() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        requestServerWithRefresh("/auth/logout", configAdvancedRequest({ token: window.localStorage.getItem("refreshTokenBurger") }, "POST")).then(() => {
            console.log("logged out");
            dispatch({
                type: LOGOUT_REQUEST_SUCCES,
            });
        })
            .catch(() => {
                console.log("error log out");
                dispatch({
                    type: LOGOUT_REQUEST_ERROR
                });
            })
    };
}
export function changeCurrentLoginInputEmail(payload) {
    return {
        type: CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentLoginInputPassword(payload) {
    return {
        type: CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function hideCurrentLoginInputPassword() {
    return {
        type: HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
    };
}
export function showCurrentLoginInputPassword() {
    return {
        type: SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
    };
}
export function clearCurrentLoginInputs() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_CURRENT_LOGIN_INPUTS,
        });
        dispatch({
            type: LOGIN_REDIRECTED,
        });
    };
}