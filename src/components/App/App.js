import { useEffect } from 'react';
import AppHeader from "../AppHeader/AppHeader";
import styles from './App.module.css';
import { cleanSelectedIngredients, downloadIngredients } from "../../services/actions/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, OPEN_ORDER_INFO } from '../../services/actions/Modal/Modal';
import { clearOrder, suspendOrder } from '../../services/actions/OrderDetails/OrderDetails';
import { cleanConstructor } from '../../services/actions/BurgerConstructor/BurgerConstructor';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home';
import { NotFound } from '../../pages/notFound';
import Login from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import Ingredients from '../../pages/ingredients';
import UnloggedPage from '../UnloggedPage/UnloggedPage';
import ProtectedPage from '../ProtectedPage/ProtectedPage';


export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const { readyIngredients } = useSelector(state => state.burgerIngredients);
  const { modalData } = useSelector(state => state.modal);
  const { orderRequest } = useSelector(state => state.orderDetails)
  const closeModalFunction = () => {
    //console.log(location);
    switch (modalData) {
      case (OPEN_ORDER_INFO): {
        dispatch(orderRequest ? suspendOrder() : clearOrder());
        //МОЕ МНЕНИЕ: "это лишнее" могу сделать условие (чтоб не стирать если идет саспенд заявки/ пользователь закрыл не увидев №заказа)
        dispatch(cleanConstructor());//
        dispatch(cleanSelectedIngredients());//
        /*Пользователи как правило желают заказать несколько одинаковых бургеров для всей семьи 
        PS (лучше сделать чекбокс для очистки внутри модального окна или добавить заказ сразу нескольких бургеров)*/
        break;
      }
      /* case (OPEN_INGREDIENT_FOCUS): { //реализовал на основе state в location
         //dispatch(clearCurrentIngredient());
         navigate("/", { state: {} });
         break;
       }*/
      default: {
        if (!!location.state.foregroundIngredient) { navigate("/", { state: {} }); }
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
      {readyIngredients &&
        <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <Routes location={background ? { ...background, state: location.state } : location}>
              {/*Общедоступные страницы*/}
              <Route path="/" element={<HomePage closeModal={closeModalFunction} />} />
              <Route path="/ingredients/:id" element={<Ingredients />} />
              {/*Защищенная страница*/}
              <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
              <Route path="/profile/*" element={<ProtectedPage><NotFound /></ProtectedPage>} />
              {/*Страницы авторизации*/}
              <Route path="/login" element={<UnloggedPage><Login /></UnloggedPage>} />
              <Route path="/register" element={<UnloggedPage><RegisterPage /></UnloggedPage>} />
              <Route path="/forgot-password" element={<UnloggedPage><ForgotPassword /></UnloggedPage>} />
              <Route path="/reset-password" element={<UnloggedPage><ResetPassword /></UnloggedPage>} />
              {/*Если страница не существует*/}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DndProvider>
        </>}
    </div>
  );
}

