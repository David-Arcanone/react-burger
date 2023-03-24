//import React from 'react';
import { StatusBig } from '../StatusBig/StatusBig';
import styles from './OrderDetails.module.css';
import VectorBig from "../../images/VectorBig.svg";
import VectorMed from "../../images/VectorMed.svg";
import VectorSmall from "../../images/VectorSmall.svg";
import React from 'react';
import { useBurgerAppSelector } from '../../utils/hooks/hooks';
const OrderDetails:React.FC=()=> {
  const { orderNumber, orderRequestFailed, orderRequest } = useBurgerAppSelector(state => state.orderDetails);

  return (
    <div className={styles.OrderDetails}>
      <h2 className={`text text_type_digits-large pb-8 ${styles.orderNumbers}`}>{orderNumber}</h2>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      <div className={`${styles.statusIcon} pb-15`}>
        <StatusBig type={orderRequestFailed?"error":"primary"} />
        <img alt="фон" src={VectorBig} className={styles.statusImages} />
        <img alt="фон" src={VectorMed} className={styles.statusImages} />
        <img alt="фон" src={VectorSmall} className={styles.statusImages} />
      </div>
      <p className='text text_type_main-default pb-2'>{!orderRequest&&(orderRequestFailed?"Ваш заказ не принят":"Ваш заказ начали готовить")}</p>
      <p className='text text_type_main-default text_color_inactive'>{!orderRequest&&!orderRequestFailed&&"Дождитесь готовности на орбитальной станции"}</p>
    </div>
  );
}

















export default OrderDetails;