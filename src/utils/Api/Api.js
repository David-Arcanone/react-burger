import { getCookie, refreshToken } from "../authentication/authentication";

const config = {
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

function configStandartRequest(payload, chosenMethod) {
    return {
        ...config.standartRequest,
        method: chosenMethod,
        body: JSON.stringify(payload)
    }
};

function configAdvancedRequest(payload, chosenMethod) {
    return {
        ...config.advancedRequest,
        method: chosenMethod,
        headers: {
            'Content-Type': 'application/json',
            // Отправляем токен и схему авторизации в заголовке при запросе данных
            'Authorization': getCookie("accessTokenBurger")//'Bearer ' + getCookie('token')

        },
        body: JSON.stringify(payload)
    }
};

function configAdvancedRequestNoBody(chosenMethod) {
    return {
        ...config.advancedRequest,
        method: chosenMethod,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie("accessTokenBurger")
        },
    }
};
function checkServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
function collectData(body) {
    if (body.success) { return Promise.resolve(body) }
    return Promise.reject("ошибка сборки данных");
};
const requestServer = (endpoint, options = {}) => {
    return fetch(`${config.baseUrl}${endpoint}`, options)
        .then(checkServerResponse)
        .then(collectData);
};

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const requestServerWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(`${config.baseUrl}${endpoint}`, options);
        return await checkResponse(res);
    } catch (err) {
        console.log(err);
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = `Bearer ${refreshData.accessToken}`;
            const res = await fetch(`${config.baseUrl}${endpoint}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


export { configStandartRequest, configAdvancedRequest, configAdvancedRequestNoBody, requestServer, requestServerWithRefresh };