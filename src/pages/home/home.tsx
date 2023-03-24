
import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import styles from './home.module.css';

const HomePage:React.FC<{closeModal: ()=>void;}>=({closeModal})=> {
    return (
          <main className={`${styles.main} pb-10`}>
            {/*левая половина панель ингредиентов*/}
            <BurgerIngredients closeModalCallback={closeModal} />
            {/*правая половина конструктор*/}
            <BurgerConstructor closeModalCallback={closeModal} />
          </main>
    );
  }
  export default HomePage;