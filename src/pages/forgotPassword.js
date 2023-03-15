
import styles from './forgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { changeCurrentResetInputEmail, clearCurrentResetInputsPage1ForgotPassword, makeForgotPasswordRequest } from '../services/actions/ResetPassword/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.reset.inputsPage1ForgotPassword);
  const { isLoadingForgotPassword, isCodeSend } = useSelector(state => state.reset);
  useEffect(() => {
    return () => {
      dispatch(clearCurrentResetInputsPage1ForgotPassword());
    };
  }, [dispatch, clearCurrentResetInputsPage1ForgotPassword]);

  if (isCodeSend) { return <Navigate to="/reset-password" replace={true}/>; }
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      
      {isLoadingForgotPassword?<p className={`text text_type_main-large`}>ЗАГРУЗКА...</p>:
      <form className={styles.formForgot} onSubmit={e => { e.preventDefault(); dispatch(makeForgotPasswordRequest(email)); }}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={e => { dispatch(changeCurrentResetInputEmail(e.target.value)) }}
          value={email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="pb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
      </form>}
      <p className="text text_type_main-default">
        Вспомнили пароль?<Link to={{ pathname: `/login` }} replace className={`text text_type_main-default pl-2 ${styles.navLink}`}>Войти</Link>
      </p>
    </main>
  );
}
export default ForgotPassword;