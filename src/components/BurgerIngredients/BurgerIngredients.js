import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import './styles.css';
import {ingredientType} from '../../utils/types/types';
import PropTypes from "prop-types";
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {Scrollbars} from 'react-custom-scrollbars-2';
function BurgerIngredients({
  ingredientsData,
  currentBuns,
  currentIngredients, 
  modalStatus, 
  openModalFunction, 
  closeModalFunction,
  modalKey,
  changeCurrentIngredient,
  focusedIngredientInModal
}) {
  //const [currentFilter, setCurrentFilter] =React.useState('buns'); //пока не требуется
  const [currentTab, setCurrentTab] = React.useState('buns');
  const filterIngredients=(foodArray,foodType)=>foodArray.filter((foodIngredient)=>foodIngredient.type===foodType);
  const clickIngredient=(newdata)=>{
    changeCurrentIngredient(newdata);
    openModalFunction();};
  return (
    <>
      <section className="BurgerIngredients mr-5 ml-5">
        <h1 className='pt-10 pb-5 text text_type_main-large'>Соберите бургер</h1>
        <div className="pb-8 tab-container">
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
        Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
        Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
        Начинки
        </Tab>
        </div>

        <Scrollbars 
        style={{ width: "600px", height: "756px"}}
        renderTrackVertical={()=><div className='scrollbar'/>}
        renderThumbVertical={()=><div className='scrolltumb'/>}
        renderTrackHorizontal={()=><div/>}
        >
        <h2 className='text text_type_main-medium pb-6'>Булки</h2>
          <ul className='ingredientList pl-1 pr-1 pb-2'>
          {ingredientsData&&currentBuns&&filterIngredients(ingredientsData,"bun").map((foodElement,index)=>{
            return   <IngredientCard food={foodElement} itemCallback={clickIngredient}
                      key={foodElement._id} 
                      count={foodElement._id===currentBuns._id?1:0}/>})}
          </ul>
          <h2 className='text text_type_main-medium pb-6'>Соусы</h2>
          <ul className='ingredientList pl-1 pr-1 pb-2'>
          {ingredientsData&&currentIngredients&&filterIngredients(ingredientsData,"sauce").map((foodElement)=>{
            return   <IngredientCard 
                        food={foodElement} itemCallback={clickIngredient}
                        key={foodElement._id}
                        count={currentIngredients.reduce((sum,element)=>{
                          return element._id===foodElement._id?(sum+1):(sum)},0)}/>})}
          </ul>
          <h2 className='text text_type_main-medium pb-6'>Начинки</h2>
          <ul className='ingredientList pl-1 pr-1 pb-2'>
          {ingredientsData&&currentIngredients&&filterIngredients(ingredientsData,"main").map((foodElement)=>{
            return   <IngredientCard 
                      food={foodElement} itemCallback={clickIngredient}
                      key={foodElement._id}
                      count={currentIngredients.reduce((sum,element)=>{
                        return element._id===foodElement._id?(sum+1):(sum)},0)}/>})}
          </ul>
        </Scrollbars>
      </section>
      {modalStatus===modalKey&&<Modal onClose={closeModalFunction}>
        <div className='pt-10 pb-15 pr-10 pl-10'>
          <IngredientDetails foodData={focusedIngredientInModal}/>
        </div>
      </Modal>}
    </>
  );
}
BurgerIngredients.propTypes={
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
  currentBuns: ingredientType.isRequired,
  currentIngredients: PropTypes.arrayOf(ingredientType).isRequired, 
  modalStatus: PropTypes.string.isRequired, 
  openModalFunction: PropTypes.func.isRequired, 
  closeModalFunction: PropTypes.func.isRequired,
  modalKey: PropTypes.string.isRequired,
  changeCurrentIngredient: PropTypes.func.isRequired,
  focusedIngredientInModal:ingredientType
};
export default BurgerIngredients;

