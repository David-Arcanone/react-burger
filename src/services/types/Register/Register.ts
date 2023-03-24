import {IProfileInputs} from "../Profile/Profile"
//////////////////Register
export interface IRegisterState {
    inputs: IProfileInputs;
    isRequesting: boolean;
    isPasswordHidden: boolean;
  }
  