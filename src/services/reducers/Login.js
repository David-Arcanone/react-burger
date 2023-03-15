import { setCookie } from "../../utils/authentication/authentication";
import {
  CHANGE_CURRENT_LOGIN_INPUT_EMAIL,
  CHANGE_CURRENT_LOGIN_INPUT_PASSWORD,
  SHOW_CURRENT_LOGIN_INPUT_PASSWORD,
  HIDE_CURRENT_LOGIN_INPUT_PASSWORD,
  CLEAR_CURRENT_LOGIN_INPUTS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCES,
  LOGIN_REQUEST_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCES,
  LOGIN_REDIRECTED
} from "../actions/Login/Login";
const initialState = {
  inputs: {
    email: "",
    password: "",
  },
  isLoading: false,
  isExiting: false,
  isPasswordHidden: true,
  loginStateChange: false,
  isLogged:false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isExiting: true,
      };
    }
    case LOGOUT_REQUEST_SUCCES: {
      setCookie("accessTokenBurger", null, { expires: -1 });//удаляем токен доступа
      window.localStorage.removeItem("refreshTokenBurger"); //можно реализовать сохранение входа между сенсами
      setCookie("isLoggedIn", null, { expires: -1 });//удаляем флаг входа
      return {
        ...state,
        isExiting: false,
        loginStateChange:true,
        isLogged:false,
      };
    }
    case LOGOUT_REQUEST_ERROR: {
      /////////Ошибка скорее всего связана со связью с сервером
      setCookie("accessTokenBurger", null, { expires: -1 });//удаляем токен доступа
      window.localStorage.removeItem("refreshTokenBurger"); //можно реализовать сохранение входа между сенсами
      setCookie("isLoggedIn", null, { expires: -1 });//удаляем флаг входа

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
      setCookie("accessTokenBurger", action.newAccesToken, { expires: 1200 });
      window.localStorage.setItem("refreshTokenBurger", action.newRefreshToken);
      setCookie("isLoggedIn", true, {});
      return {
        ...state,
        isLoading: false,
        loginStateChange:true,
        isLogged:true,
      };
    }
    case LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
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
    case LOGIN_REDIRECTED: {
      return {
        ...state,
        loginStateChange: false,
      };
    }
    default: {
      return state;
    }
  }
};