///////////Reset
export interface IReset1PageInputs {
    email: string;
  }
  export interface IReset2PageInputs {
    password: string;
    code: string;
  }
  export interface IResetPasswordState {
    inputsPage1ForgotPassword: IReset1PageInputs;
    inputsPage2ResetPassword: IReset2PageInputs;
    isLoadingForgotPassword: boolean;
    isLoadingResetPassword: boolean;
    isCodeSend: boolean;
    isResetSucces: boolean;
    isPasswordHidden: boolean;
  }