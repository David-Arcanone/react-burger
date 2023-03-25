import styles from './HeaderButton.module.css';
import React from "react"
import { THeaderButtonProps } from '../../services/types/HeaderButton/HeaderButton';

const HeaderButton: React.FC<THeaderButtonProps>=({ message, clickCallBack, statusActive, addClass, children })=> {
  /*const onMenuButtonClick = () => {
    clickCallBack();
  } */
  return (
    <button className={`${styles.headerMenuButton} pt-4 pb-4 pr-5 pl-5 ` + addClass} onClick={clickCallBack}>
      {children}
      <p className={"text text_type_main-default ml-2" + (statusActive ? "" : " text_color_inactive")}>{message}</p>
    </button>
  );
}
export default HeaderButton;