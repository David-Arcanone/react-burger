import { useEffect,FunctionComponent } from 'react';
import AppHeader from "../AppHeader/AppHeader";
import styles from './App.module.css';
import { cleanSelectedIngredients, downloadIngredients} from "../../services/actions/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { closeModal } from '../../services/actions/Modal/Modal';
import { clearOrder, suspendOrder } from '../../services/actions/OrderDetails/OrderDetails';
import { cleanConstructor } from '../../services/actions/BurgerConstructor/BurgerConstructor';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home/home';
import { NotFound } from '../../pages/notFound/notFound';
import Login from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPassword from '../../pages/forgotPassword/forgotPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';
import Profile from '../../pages/profile/profile';
import Ingredients from '../../pages/ingredients/ingredients';
import {UnloggedPage} from '../UnloggedPage/UnloggedPage';
import {ProtectedPage} from '../ProtectedPage/ProtectedPage';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import { OPEN_ORDER_INFO } from '../../services/constants/Modal/Modal';
import Feed from '../../pages/feed/feed';
import ProfileOrders from '../../pages/profileOrders/profileOrders';
import { FeedOrdersID } from '../../pages/feedOrdersID/feedOrdersID';
import { ProfileOrdersID } from '../../pages/profileOrdersID/profileOrdersID';

export const App:FunctionComponent =()=> {
  const dispatch = useBurgerAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { readyIngredients} = useBurgerAppSelector(state => state.burgerIngredients);
  const { modalData } = useBurgerAppSelector(state => state.modal);
  const { orderRequest } = useBurgerAppSelector(state => state.orderDetails)
  const closeModalFunction:()=>void = () => {
    switch (modalData) {
      case (OPEN_ORDER_INFO): {
        dispatch(orderRequest ? suspendOrder() : clearOrder());
        dispatch(cleanConstructor());
        dispatch(cleanSelectedIngredients());
        break;
      }
      default: {
        if (!!location.state.foregroundIngredient) { navigate(-1); }
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
              <Route path="/feed" element={<Feed closeModal={closeModalFunction} />} />
              <Route path="/feed/:id" element={<FeedOrdersID />} />
              <Route path="/ingredients/:id" element={<Ingredients />} />
              {/*Защищенная страница*/}
              <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
              <Route path="/profile/orders" element={<ProtectedPage><ProfileOrders closeModal={closeModalFunction}/></ProtectedPage>} />
              
              <Route path="/profile/orders/:id" element={<ProtectedPage> <ProfileOrdersID/> </ProtectedPage>} />
              {/*<Route path="/profile/*" element={<ProtectedPage><NotFound /></ProtectedPage>} />*/}
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

