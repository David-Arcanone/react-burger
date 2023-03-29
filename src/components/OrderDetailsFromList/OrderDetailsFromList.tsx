
import React from "react";
import styles from './OrderDetailsFromList.module.css';
import { TArrayOfFillingIngredientsData, TOrderFromWS } from "../../services/types/websocket/websocket";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderTime } from "../OrderTime/OrderTime";
import { useBurgerAppSelector } from "../../utils/hooks/hooks";
import LogOrderCardPic from "../LogOrderCardPics/LogOrderCardPics";

const OrderDetailsFromList: React.FC<{ isModal: boolean; orderCurrent: TOrderFromWS }> = ({ isModal, orderCurrent }) => {
    const { buns, ingredients } = useBurgerAppSelector(state => state.burgerIngredients);
    //отдельно булки (некотрые 2 булки в заказе делают/ вначале и конце, некоторые 1 пишут)
    let myBun: { smallPic: string; name: string; price: number } = { smallPic: "загрузка", name: "загрузка", price: 0 };
    //отдельно обычные ингредиенты
    //в чьих то заказах булка была посередине =), поэтому такая проверка
    buns.forEach((bunInstance) => {
        orderCurrent.ingredients.forEach((ingredientFromOrder) => {
            if (ingredientFromOrder === bunInstance.ingredientData._id) {
                myBun.smallPic = bunInstance.ingredientData.image_mobile ?? "ошибка";
                myBun.price = bunInstance.ingredientData.price ?? 0;
                myBun.name = bunInstance.ingredientData.name ?? "ошибка";
            }
        });
    });
    let listOfFillingIngredients: TArrayOfFillingIngredientsData[] = [
        ...ingredients.map((ingredientInstance) => {
            return {
                name: ingredientInstance.ingredientData.name ?? "",
                qty: orderCurrent.ingredients.reduce((acc, currentOrderIngredient) => {
                    return (currentOrderIngredient === ingredientInstance.ingredientData._id)
                        ? (acc + 1) : acc;
                }, 0),
                price: ingredientInstance.ingredientData.price ?? 0,
                smallPic: ingredientInstance.ingredientData.image_mobile ?? ""
            }
        })];
    return (<>
        <p className={`text text_type_digits-default pb-10 ${isModal ? styles.headerForModal : ""}`}>{`#${orderCurrent.number}`}</p>
        <div>
            {isModal ? <h2 className="text text_type_main-medium pb-3">{orderCurrent.name}</h2>
                : <h1 className="text text_type_main-medium pb-3">{orderCurrent.name}</h1>}
        </div>
        <p className={`text text_type_main-default pt-2 ${orderCurrent.status === "done" ? styles.doneOrder : ""}`}>
            {orderCurrent.status === "done" ? "Выполнен" : orderCurrent.status === "created" ? "Создан" : "Готовится"}
        </p>
        <h2 className="text text_type_main-medium pb-6 pt-15">Состав:</h2>
        
        <ul className={`${styles.scrollbarOrder}`}>
                {myBun.price === 0 ? null : <li key="0" className={styles.scrollbarInnerElement}>
                    <LogOrderCardPic overflowNum={0} srcPic={myBun.smallPic} partOfArray={false} />
                    <p className="text text_type_main-default">{myBun.name}</p>
                    <div className={`${styles.priceBox} pr-6`}>
                        <p className="text text_type_digits-default pr-2">
                            {`2 x ${myBun.price}`}
                        </p><CurrencyIcon type="primary" />
                    </div>
                </li>}
                {listOfFillingIngredients.map((fillingIngredient, index) => (fillingIngredient.qty > 0)
                    ? <li key={`${index}`} className={styles.scrollbarInnerElement}>
                        <LogOrderCardPic overflowNum={0} srcPic={fillingIngredient.smallPic} partOfArray={false} />
                        <p className="text text_type_main-default">{fillingIngredient.name}</p>
                        <div className={`${styles.priceBox} pr-6`}>
                            <p className="text text_type_digits-default pr-2">
                                {`${fillingIngredient.qty} x ${fillingIngredient.price}`}
                            </p><CurrencyIcon type="primary" />
                        </div>
                    </li>
                    : null)}
            </ul>

        <div className={`pt-10 ${styles.totalLine}`}>
            <OrderTime time={orderCurrent.createdAt} />
            <div className={styles.priceBox}>
                <p className="text text_type_digits-default pr-2">
                    {`${myBun.price === 0 ? "Бургер без булки! " : ""}${myBun.price * 2 + listOfFillingIngredients.reduce((acc, fillingIngredient) => (fillingIngredient.price * fillingIngredient.qty + acc), 0)}`}
                </p><CurrencyIcon type="primary" />
            </div>
        </div>
    </>
    );
}
export default OrderDetailsFromList;