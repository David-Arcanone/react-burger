import { deleteCookie, setCookie } from "../../utils/authentication/authentication";
import { TLoginActions } from "../actions/Login/Login";
import { AUTH_CHECKED, CHANGE_CURRENT_LOGIN_INPUT_EMAIL, CHANGE_CURRENT_LOGIN_INPUT_PASSWORD, CLEAR_CURRENT_LOGIN_INPUTS, HIDE_CURRENT_LOGIN_INPUT_PASSWORD, TRACK_LOGIN, LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCES, LOGOUT_REQUEST, LOGOUT_REQUEST_ERROR, LOGOUT_REQUEST_SUCCES, SHOW_CURRENT_LOGIN_INPUT_PASSWORD, LOGIN_RELOGIN } from "../constants/Login/Login";
import { ILoginState } from "../types/Login/Login";

const initialState:ILoginState = {
  inputs: {
    email: "",
    password: "",
  },
  isLoading: false,
  isExiting: false,
  isPasswordHidden: true,
  loginStateChange: false,
  isLogged:false,
  isAuthChecked:false,
};

export const loginReducer = (state = initialState, action: TLoginActions):ILoginState => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isExiting: true,
      };
    }
    case LOGOUT_REQUEST_SUCCES: {
      deleteCookie("accessTokenBurger");//удаляем токен доступа
      window.localStorage.removeItem("refreshTokenBurger"); //можно реализовать сохранение входа между сенсами
      deleteCookie("isLoggedIn"); //удаляем флаг входа
      return {
        ...state,
        isExiting: false,
        loginStateChange:true,
        isLogged:false,
      };
    }
    case LOGOUT_REQUEST_ERROR: {
      /////////Ошибка скорее всего связана со связью с сервером
      deleteCookie("accessTokenBurger");//удаляем токен доступа
      window.localStorage.removeItem("refreshTokenBurger"); //можно реализовать сохранение входа между сенсами
      deleteCookie("isLoggedIn");//удаляем флаг входа

      return {
        ...state,
        isExiting: false,
        loginStateChange:true,
        isLogged:false,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_REQUEST_SUCCES: {
      //console.log(`${action.newAccesToken.slice(7)}`);
      setCookie("accessTokenBurger", action.newAccesToken, { expires: 1200 });
      window.localStorage.setItem("refreshTokenBurger", action.newRefreshToken);
      setCookie("isLoggedIn", "Logged", {});
      return {
        ...state,
        isLoading: false,
        loginStateChange:true,
        isLogged:true,
      };
    }
    case LOGIN_RELOGIN: {
      return {
        ...state,
        isLogged:true,
      };
    }
    case LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
        //isAuthChecked:true,
      };
    }
    case CLEAR_CURRENT_LOGIN_INPUTS: {
      return {
        ...state,
        loginStateChange:false,
        inputs: initialState.inputs,
      };
    }
    case CHANGE_CURRENT_LOGIN_INPUT_EMAIL: {
      return {
        ...state,
        inputs: { ...state.inputs, email: action.newEmail },
      };
    }
    case CHANGE_CURRENT_LOGIN_INPUT_PASSWORD: {
      return {
        ...state,
        inputs: { ...state.inputs, password: action.newPassword },
      };
    }
    case SHOW_CURRENT_LOGIN_INPUT_PASSWORD: {
      return {
        ...state,
        isPasswordHidden: false,
      };
    }
    case HIDE_CURRENT_LOGIN_INPUT_PASSWORD: {
      return {
        ...state,
        isPasswordHidden: true,
      };
    }
    case TRACK_LOGIN: {
      return {
        ...state,
        loginStateChange: false,
      };
    }
    case AUTH_CHECKED:{
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    default: {
      return state;
    }
  }
};