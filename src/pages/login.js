
import styles from './login.module.css';
import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { changeCurrentLoginInputEmail, changeCurrentLoginInputPassword, clearCurrentLoginInputs, hideCurrentLoginInputPassword, makeLoginRequest, showCurrentLoginInputPassword } from '../services/actions/Login/Login';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  const { email, password } = useSelector(state => state.login.inputs);
  const { isPasswordHidden, isLoading, loginStateChange, isLogged } = useSelector(state => state.login);
  React.useEffect(() => {
    return () => {
      dispatch(hideCurrentLoginInputPassword());
      dispatch(clearCurrentLoginInputs());
    };
  }, [dispatch, hideCurrentLoginInputPassword, clearCurrentLoginInputs]);

  if (loginStateChange & isLogged) return <Navigate to="/" replace={true} />;
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      {isLoading?<p className={`text text_type_main-large`}>ЗАГРУЗКА...</p>:
      <form className={styles.formLogin} onSubmit={e => {
        e.preventDefault(); dispatch(makeLoginRequest(email, password))
      }}>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => { dispatch(changeCurrentLoginInputEmail(e.target.value)); }}
          value={email}
          name={'email'}
          error={false}
          //ref={inputRef}
          //onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="pb-6"
        />
        <Input
          type={isPasswordHidden ? "password" : 'text'}
          placeholder={'Пароль'}
          onChange={e => { dispatch(changeCurrentLoginInputPassword(e.target.value)) }}
          icon={'ShowIcon'}
          value={password}
          name={'password'}
          error={false}
          onIconClick={() => { dispatch(isPasswordHidden ? showCurrentLoginInputPassword() : hideCurrentLoginInputPassword()) }}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Войти</Button>
      </form>}
      <p className="text text_type_main-default pb-4">
        Вы — новый пользователь?<Link to={{ pathname: `/register` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль?<Link to={{ pathname: `/forgot-password` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Восстановить пароль</Link>
      </p>
    </main>
  );
}
export default Login;