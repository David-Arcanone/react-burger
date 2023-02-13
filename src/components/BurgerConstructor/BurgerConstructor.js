import React from 'react';
import { Button,ConstructorElement,DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyBig} from '../../components/CurrencyBig/CurrencyBig';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import './styles.css';
import {ingredientType} from '../../utils/types/types';
import PropTypes from "prop-types";

function BurgerConstructor({
  currentBuns,
  currentIngredients,
  modalStatus, 
  openModalFunction, 
  closeModalFunction,
  modalKey
}) {
  const [current, setCurrent] = React.useState('buns')
  return (<>
    <section className="BurgerConstructor ml-5 mr-5 pt-25">
      <ul className='basket'>
        {currentBuns&&<li className='ConstructorBunElement pb-4 pr-4' key={0 + ' ' + currentBuns._id}>
          <ConstructorElement className="list-element-ingredient"
          type="top"
          isLocked={true}
          text={`${currentBuns.name} (верх)`}
          price={currentBuns.price}
          thumbnail={currentBuns.image_mobile}/>
        </li>}
        <div className='scrollbar-constructor'>
          {currentIngredients&&currentIngredients.map((ingredient, index)=>{
            return <li className="ConstructorIngredientElement pr-2" key={index + 1 + ' ' + ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement className="list-element-ingredient"
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}/>
            </li>})
          }
        </div>
        {currentBuns&&<li className='ConstructorBunElement pb-10 pt-4 pr-2' key={currentIngredients.length + 1 + ' ' + currentBuns._id}>
          <ConstructorElement className="list-element-ingredient"
          type="bottom"
          isLocked={true}
          text={`${currentBuns.name} (низ)`}
          price={currentBuns.price}
          thumbnail={currentBuns.image_mobile}/>
        </li>}
      </ul>      
      <div className='orderOverview pr-4'>
        <p className='text text_type_digits-medium'>
          {(currentBuns.price*2+currentIngredients.reduce((sum,ingredient)=>{return ingredient.price + sum;},0))}</p>
          <CurrencyBig type="primary"/>
          <Button htmlType="button" type="primary" size="large" onClick={openModalFunction}>
          Оформить заказ</Button>        
      </div>
    </section>
    {modalStatus===modalKey&&<Modal onClose={closeModalFunction}>
      <div className='pt-30 pb-30'>
        <OrderDetails orderStatus={"Ваш заказ начали готовить"} orderNumber={"034536"}/>
      </div>
      </Modal>}
    </>
  );
}

BurgerConstructor.propTypes ={
  currentBuns: ingredientType.isRequired,
  currentIngredients: PropTypes.arrayOf(ingredientType).isRequired , 
  modalStatus: PropTypes.string.isRequired, 
  openModalFunction: PropTypes.func.isRequired, 
  closeModalFunction: PropTypes.func.isRequired,
  modalKey: PropTypes.string.isRequired
}
export default BurgerConstructor;