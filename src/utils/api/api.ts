import { TMethods, TResponseBody} from "../../services/types/api/api";
import { getCookie, refreshToken } from "../authentication/authentication";

const config:{baseUrl:string;standartRequest:RequestInit; advancedRequest:RequestInit} = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    standartRequest: {
        headers: {
            "Content-Type": "application/json",
        }
    },
    advancedRequest: {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    },

};

const configStandartRequest=<TRequestBody>(payload:TRequestBody, chosenMethod:TMethods):RequestInit=> {

    return {
        ...config.standartRequest,
        method: chosenMethod,
        body: JSON.stringify(payload)
    }
};

const configAdvancedRequest=<TRequestBody>(payload:TRequestBody, chosenMethod:TMethods):RequestInit=> {
    return {
        ...config.advancedRequest,
        method: chosenMethod,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie("accessTokenBurger")??""
        },
        body: JSON.stringify(payload)
    }
};
const configAdvancedRequestNoBody = (chosenMethod:TMethods):RequestInit=> {
    return {
        ...config.advancedRequest,
        method: chosenMethod,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie("accessTokenBurger")??""
        },
    }
};

const requestServer = <T={}>(endpoint:string, options:RequestInit = {}):Promise<TResponseBody<T>> => {
    return fetch(`${config.baseUrl}${endpoint}`, options)
        .then((value)=> {
            //console.log(res);
            if (value.ok) {
                return value.json();
            }
            return Promise.reject(value.json());
        })
        .then((body) =>{
            if (body.success === false) { return Promise.reject(body); }
            return Promise.resolve(body);
        });
};

const checkResponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const requestServerWithRefresh = async <T>(endpoint:string, options: RequestInit):Promise<TResponseBody<T>> => {
    try {
        const res = await fetch(`${config.baseUrl}${endpoint}`, options);
        const resData = await checkResponse(res);
        return resData.success ===true ? resData : Promise.reject(resData);

    } catch (err) {
        console.log(err);
        if ((err as {message:string}).message === "jwt expired") {
            //const refreshData = 
            await refreshToken(); 
            (options.headers as {authorization: string}).authorization = `Bearer ${getCookie("accessToken")}`;
            //options.headers.authorization = `Bearer ${refreshData.accessToken}`;
            const res = await fetch(`${config.baseUrl}${endpoint}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


export { configStandartRequest, configAdvancedRequest, configAdvancedRequestNoBody, requestServer, requestServerWithRefresh };