import React, { useEffect } from 'react';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import {getIngridients} from "./utils/Api/Api"
import './App.css';
import  {testBurgerContent, testBunIngredient} from "./utils/initialValue/initialValue";
//import PropTypes from "prop-types"; //У данной функции нет пропсов
function App() {
  const modalConstructorKey='constructor';
  const modalIngredientKey='ingredient';
  const [currentIngredientInModal, setCurrentIngredientInModal]=React.useState(testBurgerContent[0]);
  const changeCurrentIngredientInModal =(newdata/*:{calories:number;
    carbohydrates: number;
    fat:number;
    image:string;
    image_large: string;
    image_mobile:string;
    name:string;
    price: number;
    proteins: number;
    type:string;
    __v: number;
    _id: string}*/)=>{setCurrentIngredientInModal(newdata);};
 //changeCurrentIngredientInModal.protoTypes={data: PropTypes.ingredientType,}
  const [modal, setModal]= React.useState('');
  const [DOMReady,setDOMReady]=React.useState(false);
  const openConstructorModal=()=>{setModal(modalConstructorKey);};
  const openIngredientModal=()=>{setModal(modalIngredientKey);};
  const closeModal =()=>{setModal('');}
  const [currentOrderIngredients,setCurrentOrderIngredients]=React.useState(testBurgerContent);//пока что хардкод
  const [currentOrderBurgerBuns,setCurrentOrderBurgerBuns]=React.useState( testBunIngredient);//пока что хардкод
  const [ingredientsData, setIngredientsData] = React.useState /*<{//типизирую данные об ингредиентах
    calories:number;
    carbohydrates: number;
    fat:number;
    image:string;
    image_large: string;
    image_mobile:string;
    name:string;
    price: number;
    proteins: number;
    type:string;
    __v: number;
    _id: string}[]>*/([]);

  useEffect(()=>{
    getIngridients()
  .then( (data)=>{
    setIngredientsData(data);
    //console.log(data);
    setDOMReady(true);
  }
  )
  .catch((err)=>{
    console.log(`Ошибка получения ингредиентов с сервера. ${err}`);
  })
   },[])
  return (
    <div className='page'>
      {DOMReady &&<>
        <AppHeader></AppHeader>
        {ingredientsData&&<main className='main'>
          {/*левая половина конструктора*/}
          <BurgerIngredients 
          modalStatus={modal} 
          openModalFunction={openIngredientModal}
          modalKey={modalIngredientKey}
          closeModalFunction={closeModal} 
          ingredientsData={ingredientsData} 
          currentBuns={testBunIngredient} 
          currentIngredients={testBurgerContent}
          changeCurrentIngredient={changeCurrentIngredientInModal}
          focusedIngredientInModal={currentIngredientInModal}/>
          {/*левая половина конструктора*/}
          <BurgerConstructor 
          modalStatus={modal} 
          openModalFunction={openConstructorModal}
          modalKey={modalConstructorKey}
          closeModalFunction={closeModal} 
          currentBuns={currentOrderBurgerBuns} 
          currentIngredients={currentOrderIngredients}/>
        </main>}
      </>
      }
    
    </div>
  ); 
}
export default App;

