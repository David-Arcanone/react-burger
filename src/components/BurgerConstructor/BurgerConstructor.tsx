import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyBig } from '../CurrencyBig/CurrencyBig';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { openOrderInfo} from '../../services/actions/Modal/Modal';
import { loadOrderToServer } from '../../services/actions/OrderDetails/OrderDetails';
import BurgerFilling from '../BurgerFilling/BurgerFilling';
import { useDrop } from "react-dnd";
import { addIngredientToConstructor, changeOrderBun } from '../../services/actions/BurgerConstructor/BurgerConstructor';
import { getCookie } from '../../utils/authentication/authentication';
import { useNavigate } from 'react-router-dom';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import { IOrderIngredients } from '../../services/types/BurgerConstructor/BurgerConstructor';
import { OPEN_ORDER_INFO } from '../../services/constants/Modal/Modal';
import React from 'react';
import { TBurgerConstructorProps } from '../../services/types/BurgerConstructor/BurgerConstructor';

const BurgerConstructor:React.FC<TBurgerConstructorProps> =({closeModalCallback})=> {
  const dispatch = useBurgerAppDispatch();
  const navigate = useNavigate();
  const { bunsMenu, ingredientsMenu, orderBun, orderIngredients, ready, totalPrice } = useBurgerAppSelector(state => state.burgerConstructor);
  const { modalData } = useBurgerAppSelector(state => state.modal);
  const { unResponded } = useBurgerAppSelector(state => state.orderDetails);
  const [, dropConstructor] = useDrop({
    accept: "ingredient",
    drop(item:{bunFlag:boolean; menuIndex:number}) {
      dispatch(item.bunFlag ? (changeOrderBun(item.menuIndex)) : (addIngredientToConstructor(item.menuIndex)));
    },
  });
  const createOrderList = () => {
    const CurrentBun = bunsMenu[orderBun - 1]._id;
    return [CurrentBun, ...orderIngredients.map((ingredient) => { return ingredientsMenu[ingredient.ingredientType]._id })//, CurrentBun
  ]
  }
  return (<>
    <section className={`${styles.BurgerConstructor} ml-5 mr-5 pt-25`} ref={dropConstructor}>
      <ul className={styles.basket} >
        {orderBun !== 0 && <li className={`${styles.ConstructorBunElement} pb-4 pr-4`} key={1}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunsMenu[orderBun - 1].name} (верх)`}
            price={bunsMenu[orderBun - 1].price??0}
            thumbnail={bunsMenu[orderBun - 1].image_mobile??""} />
        </li>}
        <div className={styles.scrollbarConstructor}>
          {ready && orderIngredients.map((ingredient:IOrderIngredients, index:number) => {
            return <BurgerFilling menuIndex={ingredient.ingredientType} uuID={ingredient.uuid} key={ingredient.uuid} order={index} />
          })
          }
        </div>
        {orderBun !== 0 && <li className={`${styles.ConstructorBunElement} pb-10 pt-4 pr-4`} key={2}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunsMenu[orderBun - 1].name} (низ)`}
            price={bunsMenu[orderBun - 1].price??0}
            thumbnail={bunsMenu[orderBun - 1].image_mobile ??""} />
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
            onClick={() => {if(getCookie("isLoggedIn")!=="Logged"){navigate("/login");}else
            {dispatch((unResponded) ? openOrderInfo() : loadOrderToServer(createOrderList()));}
            }}>
            {unResponded ? "Вернуться в заказ" : "Оформить заказ"}</Button>}
      </div>
    </section>
    {modalData === OPEN_ORDER_INFO && <Modal onClose={closeModalCallback}>
      <div className='pt-30 pb-30'>
        <OrderDetails />
      </div>
    </Modal>}
  </>
  );
}
export default BurgerConstructor;