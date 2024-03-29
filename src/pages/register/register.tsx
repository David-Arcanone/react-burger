
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { changeCurrentRegisterInputEmail, changeCurrentRegisterInputName, changeCurrentRegisterInputPassword, clearCurrentRegisterInputs, hideCurrentRegisterInputPassword, makeRegisterRequest, showCurrentRegisterInputPassword } from '../../services/actions/Register/Register';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';

const RegisterPage: React.FC = () => {
  
  const location = useLocation();
  const dispatch = useBurgerAppDispatch();
  const { email, password, name } = useBurgerAppSelector(state => state.register.inputs);
  const { isPasswordHidden, isRequesting } = useBurgerAppSelector(state => state.register);
  const { loginStateChange, isLogged } = useBurgerAppSelector(state => state.login);
  useEffect(() => {
    return () => {
      dispatch(hideCurrentRegisterInputPassword());
      dispatch(clearCurrentRegisterInputs());
    };
  }, [dispatch]);

  if (loginStateChange && isLogged) return <Navigate to="/" replace={true} />;
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      {(isRequesting) ? <p className="text text_type_main-large">ЗАГРУЗКА...</p> :
        <form className={styles.formRegister} onSubmit={e => {
          e.preventDefault();
          dispatch(makeRegisterRequest(email, name, password));
        }}>
          <Input
            type='text'
            placeholder='Имя'
            onChange={e => { dispatch(changeCurrentRegisterInputName(e.target.value)) }}
            value={name}
            name='name'
            error={false}
            errorText='Ошибка'
            size='default'
            extraClass="pb-6"
          />
          <Input
            type='text'
            placeholder='E-mail'
            onChange={e => { dispatch(changeCurrentRegisterInputEmail(e.target.value)) }}
            value={email}
            name='email'
            error={false}
            errorText='Ошибка'
            size='default'
            extraClass="pb-6"
          />
          <Input
            type={isPasswordHidden ? "password" : 'text'}
            placeholder='Пароль'
            onChange={e => { dispatch(changeCurrentRegisterInputPassword(e.target.value)) }}
            icon='ShowIcon'
            value={password}
            name='password'
            error={false}
            onIconClick={() => { dispatch(isPasswordHidden ? showCurrentRegisterInputPassword() : hideCurrentRegisterInputPassword()) }}
            errorText='Ошибка'
            size='default'
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегистрироваться</Button>
        </form>}
      <p className="text text_type_main-default">
        Уже зарегистрированы?<Link state={{...location.state}} to={{ pathname: `/login` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Войти</Link>
      </p>
    </main>
  );
}
export default RegisterPage;