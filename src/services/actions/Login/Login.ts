import { configAdvancedRequest, configAdvancedRequestNoBody, configStandartRequest, requestServer, requestServerWithRefresh } from "../../../utils/api/api";
import { getCookie } from "../../../utils/authentication/authentication";
import {
    AUTH_CHECKED,
    CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
    CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
    CLEAR_CURRENT_LOGIN_INPUTS,
    HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
    TRACK_LOGIN,
    LOGIN_REQUEST,
    LOGIN_REQUEST_ERROR,
    LOGIN_REQUEST_SUCCES,
    LOGIN_RELOGIN,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_ERROR,
    LOGOUT_REQUEST_SUCCES,
    SHOW_CURRENT_LOGIN_INPUT_PASSWORD
} from "../../constants/Login/Login";
import { AppDispatch, AppThunk } from "../../types";
import { TRequestBodyLogin, TRequestBodyLogout, TRequestDataLogin, TRequestDataLogout, TRequestDataUserInfo } from "../../types/api/api";

export interface ILoginRequest {
    type: typeof LOGIN_REQUEST;
};

export interface ILoginRequestSucces {
    type: typeof LOGIN_REQUEST_SUCCES;
    newRefreshToken: string;
    newAccesToken: string;
};

export interface ILoginRelogin {
    type: typeof LOGIN_RELOGIN;
};

export interface ILoginRequestError {
    type: typeof LOGIN_REQUEST_ERROR;
};

export interface ILogOutRequest {
    type: typeof LOGOUT_REQUEST;
};

export interface ILogOutRequestSucces {
    type: typeof LOGOUT_REQUEST_SUCCES;
};

export interface ILogOutRequestError {
    type: typeof LOGOUT_REQUEST_ERROR;
};

export interface IChangeCurrentLoginInputEmail {
    type: typeof CHANGE_CURRENT_LOGIN_INPUT_EMAIL;
    newEmail: string;
};
export interface IChangeCurrentLoginInputPassword {
    type: typeof CHANGE_CURRENT_LOGIN_INPUT_PASSWORD;
    newPassword: string;
};

export interface IHideCurrentLoginInputPassword {
    type: typeof HIDE_CURRENT_LOGIN_INPUT_PASSWORD;
};

export interface IShowCurrentLoginInputPassword {
    type: typeof SHOW_CURRENT_LOGIN_INPUT_PASSWORD;
};

export interface IClearCurrentLoginInputs {
    type: typeof CLEAR_CURRENT_LOGIN_INPUTS;
};

export interface ITrackLogin {
    type: typeof TRACK_LOGIN;
};

export interface IAuthChecked {
    type: typeof AUTH_CHECKED;
}

export type TLoginActions = ITrackLogin
    | IClearCurrentLoginInputs
    | IShowCurrentLoginInputPassword
    | IHideCurrentLoginInputPassword
    | IChangeCurrentLoginInputPassword
    | IChangeCurrentLoginInputEmail
    | ILogOutRequestError
    | ILogOutRequestSucces
    | ILogOutRequest
    | ILoginRequest
    | ILoginRequestError
    | ILoginRequestSucces
    | ILoginRelogin
    | IAuthChecked;

export function processLoginRequestSucces(newRefreshToken: string, newAccesToken: string): ILoginRequestSucces {
    return {
        type: LOGIN_REQUEST_SUCCES,
        newRefreshToken,
        newAccesToken,
    };
}

export const makeLoginRequest: AppThunk = (typedEmail: string, typedPassword: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });
    requestServer<TRequestDataLogin>("/auth/login", configStandartRequest<TRequestBodyLogin>({ email: typedEmail, password: typedPassword }, "POST")).then(data => {
        dispatch(processLoginRequestSucces(data.refreshToken, data.accessToken));
    })
        .catch(() => {
            console.log("Ошибка входа");
            dispatch({
                type: LOGIN_REQUEST_ERROR
            });
        })
};


export const makeLogOut: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGOUT_REQUEST
    });

    requestServerWithRefresh<TRequestDataLogout>("/auth/logout",
        configAdvancedRequest<TRequestBodyLogout>({ token: window.localStorage.getItem("refreshTokenBurger") }, "POST")).then((data) => {
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


export function changeCurrentLoginInputEmail(payload: string): IChangeCurrentLoginInputEmail {
    return {
        type: CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
        newEmail: payload,
    };
}

export function changeCurrentLoginInputPassword(payload: string): IChangeCurrentLoginInputPassword {
    return {
        type: CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
        newPassword: payload,
    };
}

export function hideCurrentLoginInputPassword(): IHideCurrentLoginInputPassword {
    return {
        type: HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
    };
}

export function showCurrentLoginInputPassword(): IShowCurrentLoginInputPassword {
    return {
        type: SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
    };
}

export const clearCurrentLoginInputs: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: CLEAR_CURRENT_LOGIN_INPUTS,
    });
    dispatch(trackLogin());
};


export function trackLogin(): ITrackLogin {
    return {
        type: TRACK_LOGIN,
    };
}

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
    if (getCookie("accessTokenBurger")) {
        requestServerWithRefresh<TRequestDataUserInfo>("/auth/user", configAdvancedRequestNoBody("GET")).then(() => {
            dispatch({ type: LOGIN_RELOGIN })
        }).finally(() => {
            dispatch({ type: AUTH_CHECKED });
        });
    } else {
        dispatch({ type: AUTH_CHECKED });//Можно что какое нить еще флаг добавить
    }
};