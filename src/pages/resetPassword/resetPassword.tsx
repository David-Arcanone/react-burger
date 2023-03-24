
import styles from './resetPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import React,{ useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { changeCurrentResetInputCode, changeCurrentResetInputPassword, clearCurrentResetInputsPage2ResetPassword, hideCurrentResetInputsPassword, makeResetPasswordRequest, showCurrentResetInputsPassword } from '../../services/actions/ResetPassword/ResetPassword';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';

const ResetPassword:React.FC =()=> {
  const dispatch = useBurgerAppDispatch();
  const { code, password } = useBurgerAppSelector(state => state.reset.inputsPage2ResetPassword);
  const { isPasswordHidden, isLoadingResetPassword, isCodeSend, isResetSucces } = useBurgerAppSelector(state => state.reset);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentResetInputsPage2ResetPassword());
    };
  }, []);

  if (isResetSucces) { return <Navigate to="/login" replace={true} />; }
  if (!isCodeSend) { return <Navigate to="/forgot-password" replace={true} />; };
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      {isLoadingResetPassword ? <p className="text text_type_main-large">ЗАГРУЗКА...</p> :
        <form className={styles.formReset} onSubmit={e => {
          e.preventDefault();
          dispatch(makeResetPasswordRequest(password, code));
        }}>
          <Input
            type={isPasswordHidden ? "password" : 'text'}
            placeholder='Введите новый пароль'
            onChange={e => { dispatch(changeCurrentResetInputPassword(e.target.value)) }}
            icon='ShowIcon'
            value={password}
            name='password'
            error={false}
            onIconClick={() => { dispatch(isPasswordHidden ? showCurrentResetInputsPassword() : hideCurrentResetInputsPassword()) }}
            errorText='Ошибка'
            size='default'
            extraClass="mb-6"
          />
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={e => { dispatch(changeCurrentResetInputCode(e.target.value)) }}
            value={code}
            name='code'
            error={false}
            errorText='Ошибка'
            size='default'
            extraClass="pb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Сохранить</Button>
        </form>}
      <p className="text text_type_main-default">
        Вспомнили пароль?<Link to={{ pathname: `/login` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Войти</Link>
      </p>
    </main>
  );
}
export default ResetPassword;