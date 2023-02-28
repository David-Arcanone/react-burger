


//загрузка заказа на сервер
export const UPLOADING_ORDER = 'UPLOADING_ORDER';
export const APPROVED_ORDER = 'APPROVED_ORDER';
export const DECLINED_ORDER = 'DECLINED_ORDER';
export function getIngredientsFromServer() {
    return function(dispatch) {
      dispatch({
        type: DOWNLOAD_INGREDIENTS
      });
      getDeliveryMethodsRequest().then(res => {
        if (res && res.success) {
          dispatch({
            type: DOWNLOAD_INGREDIENTS_SUCCES,
            methods: res.data
          });
        } else {
          dispatch({
            type: DOWNLOAD_INGREDIENTS_ERROR
          });
        }
      });
    };
  }