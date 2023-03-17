import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../HeaderButton/HeaderButton';
import styles from './AppHeader.module.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <header className={styles.AppHeader}>
      <nav className={`${styles.headerMenuDesktop} pt-4 pb-4`}>
        <div className={styles.leftMenuSide}>
          <HeaderButton
            message="Конструктор"
            clickCallBack={() => { navigate('/'); }}
            statusActive={(location.pathname === "/"||(location.pathname.indexOf("/ingredients/")===0 ))}>
            <BurgerIcon type={(location.pathname === "/"||(location.pathname.indexOf("/ingredients/")===0 )) ? "primary" : "secondary"}></BurgerIcon>
          </HeaderButton>
          <HeaderButton message="Лента заказов"
            clickCallBack={() => { navigate('/feed'); }}
            statusActive={location.pathname === "/feed"}
            addClass="ml-2">
            <ListIcon type={location.pathname === "/feed" ? "primary" : "secondary"}></ListIcon>
          </HeaderButton>
        </div>
        <Logo className={styles.centerMenuSide} />

        <div className={styles.rightMenuSide}>
          <HeaderButton message="Личный кабинет"
            clickCallBack={() => { navigate('/profile'); }}
            statusActive={location.pathname.indexOf("/profile")===0 }>
            <ProfileIcon type={(location.pathname.indexOf("/profile")===0) ? "primary" : "secondary"}></ProfileIcon>
          </HeaderButton>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;