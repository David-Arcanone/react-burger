///////////////////////
export interface IProfileInputs {
    email: string;
    password: string;
    name: string;
}
//////////////Profile
export interface ILeggitInputs {
    leggitEmail: string;
    leggitName: string;
}
export interface IProfileState {
    inputs: IProfileInputs;
    leggitInputs: ILeggitInputs;
    isGettingProfileInfo: boolean,
    isSendingNewProfileInfo: boolean,
}