const config = {
    baseUrl: 'https://norma.nomoreparties.space/api'
};
function checkServerResponse(res){
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
function collectDataFromBody(body){
    if (body.success) {return Promise.resolve(body.data)}
        return Promise.reject("ошибка сборки данных");
}
function getIngridients(){
    return fetch(`${config.baseUrl}/ingredients`)
        .then(checkServerResponse)
        .then(collectDataFromBody);
};

export {getIngridients}