///////////////Login
export interface ILoginInputs {
    email: string;
    password: string;
  }
  export interface ILoginState {
    inputs: ILoginInputs;
    isLoading: boolean;
    isExiting: boolean;
    isPasswordHidden: boolean;
    loginStateChange: boolean;
    isLogged: boolean;
    isAuthChecked: boolean;
  }