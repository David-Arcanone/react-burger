const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
};
function configNewOrder(orderArray) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            ingredients: orderArray
        })
    }
}
function checkServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
function collectData(body) {
    if (body.success) { return Promise.resolve(body) }
    return Promise.reject("ошибка сборки данных");
}
const requestServer = (endpoint, options = {}) => {
    // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    return fetch(`${config.baseUrl}${endpoint}`, options)
        .then(checkServerResponse)
        .then(collectData);
};
export { configNewOrder, requestServer }