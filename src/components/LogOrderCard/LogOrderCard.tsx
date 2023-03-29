import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderFromWS } from "../../services/types/websocket/websocket";
import { useBurgerAppSelector } from "../../utils/hooks/hooks";
import LogOrderCardPic from "../LogOrderCardPics/LogOrderCardPics";
import { OrderTime } from "../OrderTime/OrderTime";
import styles from "./LogOrderCard.module.css";
import { useNavigate, useLocation } from 'react-router-dom';

export const LogOrderCard: React.FC<{ order: TOrderFromWS; isProfile: boolean }> = ({ order, isProfile }) => {
    const { buns, ingredients } = useBurgerAppSelector(state => state.burgerIngredients);
    const navigate = useNavigate();
    const location = useLocation();
    let myPrice: number = 0;
    let arrayOfPics: string[] = [];
    //в некоторых заказах булка почемуто не на 1 месте, поэтому проверка
    buns.forEach((bunsInstance) => {
        order.ingredients.forEach((ingredientFromOrder) => {
            if (ingredientFromOrder === bunsInstance.ingredientData._id) {
                myPrice = (bunsInstance.ingredientData.price ?? 0) * 2;
                arrayOfPics = [bunsInstance.ingredientData.image_mobile ?? ""];
            }
        });
    });
    //тк там могут быть булки в списке, нужна фильтрация, иначе undefinded окажется в массиве
    for (let i = 0; i < order.ingredients.length; i++) {
        ingredients.forEach((ingredientInstance) => {
            if (ingredientInstance.ingredientData._id === order.ingredients[i]) {
                myPrice += ingredientInstance.ingredientData.price ?? 0;
                if (arrayOfPics.length < 6) {
                    arrayOfPics = [ingredientInstance.ingredientData.image_mobile ?? "", ...arrayOfPics];
                }
            }
        })
    }
    const overflowIngredients = (order.ingredients.length - 6) > 0;
    const numberOfHiddenIngredients = overflowIngredients ? (order.ingredients.length - 6) : 0;
    
    return (
        <div className={`${styles.logOrderCard} pl-6 pr-6`} onClick={() => {
            navigate(`/${isProfile?"profile/orders":"feed"}/${order._id}`,
                { state: { background: location, foregroundIngredient: order._id } });
        }}>
            <div className={`pt-6 pb-6 ${styles.logOrderCardBox}`}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <OrderTime time={order.createdAt} />
            </div>
            <h2 className="text text_type_main-medium">{`${order.name}`}</h2>
            {isProfile ? <p className={`text text_type_main-default pt-2 ${order.status === "done" ? styles.doneOrder : ""}`}>
                {order.status === "done" ? "Выполнен" : order.status === "created" ? "Создан" : "Готовится"}
            </p> : null}
            <div className={`pb-6 pt-6 ${styles.logOrderCardBox}`}>
                <ul className={styles.arrayOfPics}>
                    {arrayOfPics.map((picSource, indexOfPic) => {
                        if (indexOfPic === 0 && overflowIngredients) {
                            return (
                                <LogOrderCardPic partOfArray={true} srcPic={picSource} overflowNum={numberOfHiddenIngredients} key={indexOfPic} />
                            )
                        }
                        return (
                            <LogOrderCardPic  partOfArray={true} srcPic={picSource} overflowNum={0} key={indexOfPic} />
                        )
                    })
                    }
                </ul>
                <div className={styles.priceBox}><p className="text text_type_digits-default pr-2">{myPrice}</p><CurrencyIcon type="primary" /></div>
            </div>
        </div>
    );
}
