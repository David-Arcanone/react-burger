import React from 'react';
import { Logo,BurgerIcon, ListIcon,ProfileIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../HeaderButton/HeaderButton';
import './styles.css';
function AppHeader() {
  const [menuMode, setMenuMod] = React.useState('Конструктор');//для интерактива (не нужна по заданию)
  const pressMenuButton =(value)=>{
    if(value!==menuMode){
      setMenuMod(value);
    }
  };
  
  return (
    <header className="AppHeader">
      <nav className={"headerMenuDesktop pt-4 pb-4"}>
        <div className='left-menu-side'>
          <HeaderButton message="Конструктор" clickCallBack={pressMenuButton} statusActive={menuMode==="Конструктор"}>
            <BurgerIcon type={menuMode==="Конструктор"?"primary":"secondary"}></BurgerIcon>
          </HeaderButton>
          <HeaderButton message="Лента заказов" clickCallBack={pressMenuButton} statusActive={menuMode==="Лента заказов"} addClass="ml-2">
            <ListIcon type={menuMode==="Лента заказов"?"primary":"secondary"}></ListIcon>
          </HeaderButton>
        </div>
        <Logo className="center-menu-side"/>
        
        <div className="right-menu-side">
          <HeaderButton message="Личный кабинет" clickCallBack={pressMenuButton} statusActive={menuMode==="Личный кабинет"}>
            <ProfileIcon type={menuMode==="Личный кабинет"?"primary":"secondary"}></ProfileIcon>
          </HeaderButton>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;