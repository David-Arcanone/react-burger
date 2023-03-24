//выбранный ингредиент
import { configAdvancedRequest, configAdvancedRequestNoBody, requestServerWithRefresh } from "../../../utils/api/api";
import { TRACK_LOGIN } from "../../constants/Login/Login";
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
} from "../../constants/Profile/Profile";
import { AppDispatch, AppThunk } from "../../types";
import { TRequestBodyUpdateProfile, TRequestDataUserInfo } from "../../types/api/api";

export interface IChangeCurrentProfileInputEmail {
    type: typeof CHANGE_CURRENT_PROFILE_INPUT_EMAIL;
    newEmail: string;
};
export interface IChangeCurrentProfileInputPassword {
    type: typeof CHANGE_CURRENT_PROFILE_INPUT_PASSWORD;
    newPassword: string;
};
export interface IChangeCurrentProfileInputName {
    type: typeof CHANGE_CURRENT_PROFILE_INPUT_NAME;
    newName: string;
};
export interface IMakeProfileRequest {
    type: typeof MAKE_PROFILE_REQUEST;
};
export interface IMakeProfileRequestSucces {
    type: typeof MAKE_PROFILE_REQUEST_SUCCES;
    currentName: string;
    currentPassword: string;
    currentEmail: string;
};
export interface IMakeProfileRequestError {
    type: typeof MAKE_PROFILE_REQUEST_ERROR;
};

export interface IUpdateProfileRequest {
    type: typeof UPDATE_PROFILE_REQUEST;
};
export interface IUpdateProfileRequestSucces {
    type: typeof UPDATE_PROFILE_REQUEST_SUCCES;
    currentName: string;
    currentPassword: string;
    currentEmail: string;
};
export interface IUpdateProfileRequestError {
    type: typeof UPDATE_PROFILE_REQUEST_ERROR;
};
export type TProfileActions = IUpdateProfileRequestError
    | IUpdateProfileRequestSucces
    | IUpdateProfileRequest
    | IMakeProfileRequestError
    | IMakeProfileRequestSucces
    | IMakeProfileRequest
    | IChangeCurrentProfileInputName
    | IChangeCurrentProfileInputPassword
    | IChangeCurrentProfileInputEmail;

export function changeCurrentProfileInputEmail(payload: string): IChangeCurrentProfileInputEmail {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentProfileInputPassword(payload: string): IChangeCurrentProfileInputPassword {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentProfileInputName(payload: string): IChangeCurrentProfileInputName {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_NAME,
        newName: payload,
    };
}

export const resetCurrentProfileInputsToValue: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: MAKE_PROFILE_REQUEST
    });
    requestServerWithRefresh<TRequestDataUserInfo>("/auth/user", configAdvancedRequestNoBody("GET")).then((data) => {
        dispatch({
            type: MAKE_PROFILE_REQUEST_SUCCES,
            currentName: data.user.name,
            currentPassword: "",
            currentEmail: data.user.email,
        });
        dispatch({
            type: TRACK_LOGIN,
        })
    })
        .catch(() => {
            console.log("error loading user info");
            dispatch({
                type: MAKE_PROFILE_REQUEST_ERROR
            });
        })
};


interface IUpdatedProfileBody { name?: string; email?: string; password?: string };
export const updateProfile: AppThunk = (newName: string, newEmail: string, newPassword: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: UPDATE_PROFILE_REQUEST
    });
    let newBody: IUpdatedProfileBody = {};//проверка чтобы пустые строки не отправить.
    if (newName !== "") { newBody.name = newName };
    if (newEmail !== "") { newBody.email = newEmail };
    if (newPassword !== "") { newBody.password = newPassword };
    requestServerWithRefresh<TRequestDataUserInfo>("/auth/user", configAdvancedRequest<TRequestBodyUpdateProfile>(newBody, "PATCH")).then((data) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST_SUCCES,
            currentName: data.user.name,
            currentPassword: "",
            currentEmail: data.user.email,
        });
    })
        .catch(() => {
            console.log("error updating user info");
            dispatch({
                type: UPDATE_PROFILE_REQUEST_ERROR
            });
        })
};

