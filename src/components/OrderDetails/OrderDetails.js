//import React from 'react';
import { StatusBig } from '../StatusBig/StatusBig';
import './styles.css';
import PropType from "prop-types";
import VectorBig from "../../images/VectorBig.svg";
import VectorMed from "../../images/VectorMed.svg";
import VectorSmall from "../../images/VectorSmall.svg";

function OrderDetails({orderStatus, orderNumber}) {
  return (
    <div className='OrderDetails'>
        <h2 className='text text_type_digits-large pb-8 orderNumbers'>{orderNumber}</h2>
        <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
        <div className='statusIcon pb-15'>
          <StatusBig type="primary" />
          <img alt={orderStatus} src={VectorBig} className="statusImages"/>
          <img alt={orderStatus} src={VectorMed} className="statusImages"/>
          <img alt={orderStatus} src={VectorSmall} className="statusImages"/>
        </div>
        <p className='text text_type_main-default pb-2'>{orderStatus}</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}
OrderDetails.propTypes={
    orderStatus: PropType.string.isRequired,
    orderNumber: PropType.string.isRequired
};


















export default  OrderDetails;