//выбранный ингредиент
import { configAdvancedRequest, configAdvancedRequestNoBody, requestServerWithRefresh } from "../../../utils/api/api";
import { LOGIN_REDIRECTED } from "../Login/Login";
export const CHANGE_CURRENT_PROFILE_INPUT_EMAIL = 'CHANGE_CURRENT_PROFILE_INPUT_EMAIL';
export const CHANGE_CURRENT_PROFILE_INPUT_PASSWORD = 'CHANGE_CURRENT_PROFILE_INPUT_PASSWORD';
export const CHANGE_CURRENT_PROFILE_INPUT_NAME = 'CHANGE_CURRENT_PROFILE_INPUT_NAME';
export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCES = 'PROFILE_REQUEST_SUCCES';
export const PROFILE_REQUEST_ERROR = 'PROFILE_REQUEST_ERROR';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_REQUEST_SUCCES = 'UPDATE_PROFILE_REQUEST_SUCCES';
export const UPDATE_PROFILE_REQUEST_ERROR = 'UPDATE_PROFILE_REQUEST_ERROR';

export function changeCurrentProfileInputEmail(payload) {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_EMAIL,
        newEmail: payload,
    };
}
export function changeCurrentProfileInputPassword(payload) {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_PASSWORD,
        newPassword: payload,
    };
}
export function changeCurrentProfileInputName(payload) {
    return {
        type: CHANGE_CURRENT_PROFILE_INPUT_NAME,
        newName: payload,
    };
}
export function resetCurrentProfileInputsToValue() {
    return function (dispatch) {
        dispatch({
            type: PROFILE_REQUEST
        });
        requestServerWithRefresh("/auth/user", configAdvancedRequestNoBody("GET")).then((data) => {
            //console.log(data);
            dispatch({
                type: PROFILE_REQUEST_SUCCES,
                currentName: data.user.name,
                currentPassword: "",
                currentEmail: data.user.email,
            });
            dispatch({                
                    type: LOGIN_REDIRECTED,                
            })
        })
            .catch(() => {
                console.log("error loading user info");
                dispatch({
                    type: PROFILE_REQUEST_ERROR
                });
            })
    };
}
export function updateProfile(newName, newEmail, newPassword) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });
        let newBody = {};//проверка чтобы пустые строки не отправить.
        if (newName !== "") { newBody.name = newName };
        if (newEmail !== "") { newBody.email = newEmail };
        if (newPassword !== "") { newBody.password = newPassword };
        requestServerWithRefresh("/auth/user", configAdvancedRequest(newBody, "PATCH")).then((data) => {
            console.log(data);
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

}