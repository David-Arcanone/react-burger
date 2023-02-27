//import React, { useMemo } from 'react';
import { Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyBig } from '../../components/CurrencyBig/CurrencyBig';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openOrderInfo, OPEN_ORDER_INFO } from '../../services/actions/Modal/Modal';
import { loadOrderToServer } from '../../services/actions/OrderDetails/OrderDetails';
import BurgerFilling from '../BurgerFilling/BurgerFilling';
import { useDrop } from "react-dnd";
import { addIngredientToConstructor, changeOrderBun } from '../../services/actions/BurgerConstructor/BurgerConstructor';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bunsMenu, ingredientsMenu, orderBun, orderIngredients, ready, totalPrice } = useSelector(state => state.burgerConstructor);
  const { modalData } = useSelector(state => state.modal);
  const { unResponded } = useSelector(state => state.orderDetails);
  
  const [, dropConstructor] = useDrop({
    accept: "ingredient",
    drop({menuIndex, bunFlag}) {
      dispatch(bunFlag?(changeOrderBun(menuIndex)):(addIngredientToConstructor(menuIndex)));
    },
});
  /* Сумму я беру со сторэджа, но если это лишнее, раскоментирую и заменю totalPrice на sum в табло цены заказа.
  const sum = useMemo(() => (bunsMenu[orderBun - 1].price * 2 + orderIngredients.reduce((sum, ingredient) => {
    return ingredientsMenu[ingredient.ingredientType].price + sum;
  }, 0)), [orderIngredients, orderBun]);*/
  const createOrderList = () => {
    //функция вызывается только когда есть булки (условие существования кнопки), так что проверки булок нет
    const CurrentBun = bunsMenu[orderBun - 1]._id;
    //if (orderIngredients.length > 0) { 
    return [CurrentBun, ...orderIngredients.map((ingredient) => { return ingredientsMenu[ingredient.ingredientType]._id }), CurrentBun]
    //};return [CurrentBun, CurrentBun]
  }
  return (<>
    <section className={`${styles.BurgerConstructor} ml-5 mr-5 pt-25`} ref={dropConstructor}>
        <ul className={styles.basket} >
          {orderBun !== 0 && <li className={`${styles.ConstructorBunElement} pb-4 pr-4`} key={1}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunsMenu[orderBun - 1].name} (верх)`}
              price={bunsMenu[orderBun - 1].price}
              thumbnail={bunsMenu[orderBun - 1].image_mobile} />
          </li>}
          <div className={styles.scrollbarConstructor}>
            {ready && orderIngredients.map((ingredient, index) => {
              return <BurgerFilling menuIndex={ingredient.ingredientType} uuID={ingredient.uuid} key={ingredient.uuid} order={index} />
            })
            }
          </div>
          {orderBun !== 0 && <li className={`${styles.ConstructorBunElement} pb-10 pt-4 pr-4`} key={2}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunsMenu[orderBun - 1].name} (низ)`}
              price={bunsMenu[orderBun - 1].price}
              thumbnail={bunsMenu[orderBun - 1].image_mobile} />
          </li>}
        </ul>
        <div className={`${styles.orderOverview} pr-4`}>
          <p className='text text_type_digits-medium'>
            {totalPrice}</p>
          <CurrencyBig type="primary" />
          {orderBun === 0 ?
            <p className='text text_type_main-small'>Для оформления заказа нужны булки</p> : <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                dispatch((unResponded) ? openOrderInfo() : loadOrderToServer(createOrderList()));
              }}>
              {unResponded ? "Вернуться в заказ" : "Оформить заказ"}</Button>}
        </div>
    </section>
    {modalData === OPEN_ORDER_INFO && <Modal>
      <div className='pt-30 pb-30'>
        <OrderDetails />
      </div>
    </Modal>}
  </>
  );
}
export default BurgerConstructor;