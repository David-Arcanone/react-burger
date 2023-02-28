import { useEffect } from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import { cleanSelectedIngredients, downloadIngredients } from "../../services/actions/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, OPEN_INGREDIENT_FOCUS, OPEN_ORDER_INFO } from '../../services/actions/Modal/Modal';
import { clearCurrentIngredient } from '../../services/actions/IngredientDetails/IngredientDetails';
import { clearOrder } from '../../services/actions/OrderDetails/OrderDetails';
import { cleanConstructor } from '../../services/actions/BurgerConstructor/BurgerConstructor';

function App() {
  const dispatch = useDispatch();
  const { readyIngredients } = useSelector(state => state.burgerIngredients);
  const { modalData } = useSelector(state => state.modal);
  const closeModalFunction =()=> {

    switch (modalData) {
      case (OPEN_ORDER_INFO): {
        dispatch(clearOrder());
        //МОЕ МНЕНИЕ: "это лишнее"
        dispatch(cleanConstructor());//
        dispatch(cleanSelectedIngredients());//
        /*Пользователи как правило желают заказать несколько одинаковых бургеров для всей семьи 
        PS (лучше сделать чекбокс для очистки внутри модального окна или добавить заказ сразу нескольких бургеров)*/
        break;
      }
      case (OPEN_INGREDIENT_FOCUS): {
        dispatch(clearCurrentIngredient());
        break;
      }
      default: {
        break;
      }
    };
    dispatch(closeModal());
  }
  useEffect(() => {
    dispatch(downloadIngredients());
  }, [dispatch]);
  return (
    <div className={styles.page}>
      {readyIngredients && <>
        <AppHeader />
        {<main className={`${styles.main} pb-10`}>
          <DndProvider backend={HTML5Backend}>
            {/*левая половина панель ингредиентов*/}
            <BurgerIngredients closeModalCallback={closeModalFunction} />
            {/*правая половина конструктор*/}
            <BurgerConstructor closeModalCallback={closeModalFunction} />
          </DndProvider>
        </main>}
      </>
      }
    </div>
  );
}
export default App;

