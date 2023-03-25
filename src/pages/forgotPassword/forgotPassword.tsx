
import styles from './forgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React,{ useEffect,ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { changeCurrentResetInputEmail, clearCurrentResetInputsPage1ForgotPassword, makeForgotPasswordRequest } from '../../services/actions/ResetPassword/ResetPassword';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';

const ForgotPassword:React.FC=()=> {
  const dispatch = useBurgerAppDispatch();
  const location = useLocation();
  const { email } = useBurgerAppSelector(state => state.reset.inputsPage1ForgotPassword);
  const { isLoadingForgotPassword, isCodeSend } = useBurgerAppSelector(state => state.reset);
  useEffect(() => {
    return () => {
      dispatch(clearCurrentResetInputsPage1ForgotPassword());
    };
  }, [dispatch]);

  if (isCodeSend) { return <Navigate state={{...location.state}} to="/reset-password" replace={true}/>; }
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      
      {isLoadingForgotPassword?<p className="text text_type_main-large">ЗАГРУЗКА...</p>:
      <form className={styles.formForgot} onSubmit={(e:React.FormEvent<HTMLElement>) => { e.preventDefault(); dispatch(makeForgotPasswordRequest(email)); }}>
        <Input
          type='text'
          placeholder='Укажите e-mail'
          onChange={(e:ChangeEvent<HTMLInputElement>) => { dispatch(changeCurrentResetInputEmail(e.target.value)) }}
          value={email}
          name='email'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass="pb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
      </form>}
      <p className="text text_type_main-default">
        Вспомнили пароль?<Link state={{...location.state}} to={{ pathname: `/login` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Войти</Link>
      </p>
    </main>
  );
}
export default ForgotPassword;