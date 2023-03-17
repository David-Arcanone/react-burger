
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from "react";
import { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentProfileInputEmail, changeCurrentProfileInputName, changeCurrentProfileInputPassword, resetCurrentProfileInputsToValue, updateProfile } from '../services/actions/Profile/Profile';
import { makeLogOut } from '../services/actions/Login/Login';

function Profile() {
    const dispatch = useDispatch();
    const { email, password, name } = useSelector(state => state.profile.inputs);
    const { leggitEmail, leggitName } = useSelector(state => state.profile.leggitInputs);
    const { isGettingProfileInfo, isSendingNewProfileInfo} = useSelector(state => state.profile);
    const { loginStateChange, isLogged } = useSelector(state => state.login);
    const inputRefName = useRef(null);
    const inputRefLogin = useRef(null);
    const inputRefPassword = useRef(null);
    const onIconClickName = () => {
        setTimeout(() => inputRefName.current.focus(), 0);
    }
    const onIconClickLogin = () => {
        setTimeout(() => inputRefLogin.current.focus(), 0);
    }
    const onIconClickPassword = () => {
        setTimeout(() => inputRefPassword.current.focus(), 0);
    }
    useEffect(() => {
        dispatch(resetCurrentProfileInputsToValue());
        return () => {
        };
    }, [dispatch, resetCurrentProfileInputsToValue]);

    if (loginStateChange & !isLogged) return <Navigate to="/login" replace={true} />;

    return (
        <main className={styles.main}>
            <div className={styles.collumn}>
                <h1 className={`text text_type_main-medium ${styles.menuItem}`}>Профиль</h1>
                <Link to={{ pathname: `/profile/orders` }} className={`${styles.navLink} ${styles.menuItem}`}><p className="text text_type_main-medium text_color_inactive">История заказов</p></Link>
                <Link to={{ pathname: `` }} className={`${styles.navLink} ${styles.menuItem}`} onClick={(e) => { e.preventDefault(); dispatch(makeLogOut()) }}><p className="text text_type_main-medium text_color_inactive">Выход</p></Link>
                <p className="text text_type_main-default text_color_inactive pt-20">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            {(isGettingProfileInfo|| isSendingNewProfileInfo)?<p className={`text text_type_main-large`}>ЗАГРУЗКА...</p>:
            <form className={styles.collumn} onSubmit={e => {
                e.preventDefault();
                if (password !== "" || email !== leggitEmail || name !== leggitName) {
                    dispatch(updateProfile(
                        name,
                        email,
                        password))
                }
            }} onReset={(e) => { e.preventDefault(); dispatch(resetCurrentProfileInputsToValue()); }}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => { dispatch(changeCurrentProfileInputName(e.target.value)) }}
                    icon={'EditIcon'}
                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputRefName}
                    onIconClick={onIconClickName}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={e => { dispatch(changeCurrentProfileInputEmail(e.target.value)) }}
                    icon={'EditIcon'}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRefLogin}
                    onIconClick={onIconClickLogin}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    onChange={e => { dispatch(changeCurrentProfileInputPassword(e.target.value)) }}
                    icon={'EditIcon'}
                    value={password}
                    name={'password'}
                    error={false}
                    ref={inputRefPassword}
                    onIconClick={onIconClickPassword}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                {(password !== "" || email !== leggitEmail || name !== leggitName) && <div className={styles.buttonInterface}>
                    <Button htmlType="reset" type="secondary" size="medium" extraClass="mr-5">Отмена</Button>
                    <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </div>}
            </form>}
        </main>
    );
}
export default Profile;