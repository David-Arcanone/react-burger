import { IIngredient } from "../BurgerConstructor/BurgerConstructor";

export type TMethods = "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "PATCH";
//export type TPayload = { [key: string]: string | string[] | null }  | { email: string, password: string };
type TUser = { name: string; email: string; };
export type TRequestBodyOrder = { ingredients: string[] };
export type TRequestBodyLogin = { email: string; password: string; };
export type TRequestBodyLogout = { token: string | null };
export type TRequestBodyUpdateProfile = { name?: string; email?: string; password?: string; };
export type TRequestBodyRegister = { name: string; email: string; password: string; };
export type TRequestBodyForgotPassword = { email: string; };
export type TRequestBodyResetPassword = { password: string; token: string; };
export type TRequestBodyRefreshToken = { token: string };
export type TRequestBody = TRequestBodyOrder
  | TRequestBodyLogin
  | TRequestBodyLogout
  | TRequestBodyUpdateProfile
  | TRequestBodyRegister
  | TRequestBodyForgotPassword
  | TRequestBodyResetPassword
  | TRequestBodyRefreshToken | {};
export type TRequestDataRefreshToken = { accessToken: string; refreshToken: string; };
export type TRequestDataUserInfo = { user: TUser; };//+Обновление пользователя
export type TRequestDataIngredients = { data: IIngredient[] };
export type TRequestDataOrder = { name: string; order: { number: number } };
export type TRequestDataLogin = TRequestDataUserInfo & TRequestDataRefreshToken;// {user:TUser; accessToken: string; refreshToken: string;};
export type TRequestDataRegister = TRequestDataLogin; //{user:TUser; accessToken: string; refreshToken: string;};
// Эти пустые, оставил названия для систематичности
export type TRequestDataLogout = {}; //там мэссэдж, и succes: уже есть в TResponseBody
export type TRequestDataForgotPassword = {}; //там мэссэдж, и succes: уже есть в TResponseBody
export type TRequestDataResetPassword = {}; //там мэссэдж, и succes: уже есть в TResponseBody


export type TResponseBody<TData> = TData & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

interface ICustomBody<T extends any> extends Body {
  json(): Promise<T>;
}
//на случай если внутри надо будет прописать
export interface ICustomResponse<T> extends ICustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
