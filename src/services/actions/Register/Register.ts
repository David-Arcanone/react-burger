//выбранный ингредиент
import { configStandartRequest, requestServer } from "../../../utils/api/api";
import { CHANGE_CURRENT_REGISTER_INPUT_EMAIL, CHANGE_CURRENT_REGISTER_INPUT_NAME, CHANGE_CURRENT_REGISTER_INPUT_PASSWORD, CLEAR_CURRENT_REGISTER_INPUTS, HIDE_CURRENT_REGISTER_INPUT_PASSWORD, REGISTER_REQUEST_FAILED, REGISTER_REQUEST_START, REGISTER_REQUEST_SUCCES, SHOW_CURRENT_REGISTER_INPUT_PASSWORD } from "../../constants/Register/Register";
import { AppDispatch, AppThunk } from "../../types";
import { TRequestBodyRegister, TRequestDataRegister } from "../../types/api/api";
import { processLoginRequestSucces, trackLogin } from "../Login/Login";

export interface IChangeCurrentRegisterInputEmail {
    type: typeof CHANGE_CURRENT_REGISTER_INPUT_EMAIL;
    newEmail: string;
};
export interface IChangeCurrentRegisterInputPassword {
    type: typeof CHANGE_CURRENT_REGISTER_INPUT_PASSWORD;
    newPassword: string;
};
export interface IChangeCurrentRegisterInputName {
    type: typeof CHANGE_CURRENT_REGISTER_INPUT_NAME;
    newName: string;
};
export interface IHideCurrentRegisterInputPassword {
    type: typeof HIDE_CURRENT_REGISTER_INPUT_PASSWORD;
};
export interface IShowCurrentRegisterInputPassword {
    type: typeof SHOW_CURRENT_REGISTER_INPUT_PASSWORD;
};
export interface IClearCurrentRegisterInputs {
    type: typeof CLEAR_CURRENT_REGISTER_INPUTS;
};
export interface IRegisterRequestStart {
    type: typeof REGISTER_REQUEST_START;
};
export interface IRegisterRequestSucces {
    type: typeof REGISTER_REQUEST_SUCCES;
};
export interface IRegisterRequestFailed {
    type: typeof REGISTER_REQUEST_FAILED;
};
export type TRegisterActions = IRegisterRequestFailed
    | IRegisterRequestSucces
    | IRegisterRequestStart
    | IClearCurrentRegisterInputs
    | IShowCurrentRegisterInputPassword
    | IHideCurrentRegisterInputPassword
    | IChangeCurrentRegisterInputName
    | IChangeCurrentRegisterInputPassword
    | IChangeCurrentRegisterInputEmail;

export const makeRegisterRequest: AppThunk = (typedEmail: string, typedName: string, typedPassword: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: REGISTER_REQUEST_START
    });
    requestServer<TRequestDataRegister>("/auth/register", configStandartRequest<TRequestBodyRegister>({ email: typedEmail, password: typedPassword, name: typedName }, "POST"))
        .then(data => {
            dispatch({
                type: REGISTER_REQUEST_SUCCES,
            });
            dispatch(processLoginRequestSucces(data.refreshToken, data.accessToken));
        })
        .catch(() => {
            dispatch({
                type: REGISTER_REQUEST_FAILED
            });
        })
};


export function changeCurrentRegisterInputEmail(payload: string): IChangeCurrentRegisterInputEmail {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentRegisterInputPassword(payload: string): IChangeCurrentRegisterInputPassword {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentRegisterInputName(payload: string): IChangeCurrentRegisterInputName {
    return {
        type: CHANGE_CURRENT_REGISTER_INPUT_NAME,
        newName: payload,
    };
}
export function hideCurrentRegisterInputPassword(): IHideCurrentRegisterInputPassword {
    return {
        type: HIDE_CURRENT_REGISTER_INPUT_PASSWORD,
    };
}
export function showCurrentRegisterInputPassword(): IShowCurrentRegisterInputPassword {
    return {
        type: SHOW_CURRENT_REGISTER_INPUT_PASSWORD,
    };
}
export const clearCurrentRegisterInputs: AppThunk = () => (dispatch: AppDispatch)=> {
    dispatch({
        type: CLEAR_CURRENT_REGISTER_INPUTS,
    });
    dispatch(trackLogin());
};


