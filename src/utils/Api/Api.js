const config = {
    baseUrl: 'https://norma.nomoreparties.space/api'
};
function checkServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
function collectDataFromBody(body) {
    if (body.success) { return Promise.resolve(body.data) }
    return Promise.reject("ошибка сборки данных");
}

function getIngridients() {
    return fetch(`${config.baseUrl}/ingredients`)
        .then(checkServerResponse)
        .then(collectDataFromBody);
};
function getOrderFromServer(orderArray) {
    return fetch(`${config.baseUrl}/orders`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            ingredients: orderArray
        })
    })
        .then(checkServerResponse)
};

export { getIngridients, getOrderFromServer }