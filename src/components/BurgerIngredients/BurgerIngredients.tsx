import React, { useEffect, useRef } from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import styles from './BurgerIngredients.module.css';
import {IngredientDetails} from '../IngredientDetails/IngredientDetails';
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { refreshTabs } from '../../services/actions/BurgerIngredients/BurgerIngredients';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';

const BurgerIngredients:React.FC<{closeModalCallback: ()=>void}> =({ closeModalCallback })=> {
  const dispatch = useBurgerAppDispatch();
  const location = useLocation();
  const { bunsTabStatus, souceTabStatus, mainTabStatus, ingredients, buns } = useBurgerAppSelector(state => state.burgerIngredients);
  //для работы индикации Tab
  const [refBun, inViewBun] = useInView({ threshold: 0.2, });
  const [refSouce, inViewSouce] = useInView({ threshold: 0.2, });
  const [refMain, inViewMain] = useInView({ threshold: 0.2, });
  //для работы кнопок Tab
  const targetBun = useRef<HTMLDivElement>(null);
  const targetSouce = useRef<HTMLDivElement>(null);
  const targetMain = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(refreshTabs(inViewBun, inViewSouce, inViewMain));
  }, [inViewBun, inViewSouce, inViewMain, dispatch]);
  return (
    <>
      <section className={`${styles.BurgerIngredients} mr-5 ml-5`}>
        <h1 className='pt-10 pb-5 text text_type_main-large'>Соберите бургер</h1>
        <div className={`pb-8 ${styles.tabContainer}`}>
          <Tab value="buns" active={bunsTabStatus} onClick={() => {
            if(targetBun.current) targetBun.current.scrollIntoView({ behavior: "smooth" })
          }}>
            Булки
          </Tab>
          <Tab value="sauce" active={souceTabStatus} onClick={() => {
            if(targetSouce.current)targetSouce.current.scrollIntoView({ behavior: "smooth" })
          }}>
            Соусы
          </Tab>
          <Tab value="main" active={mainTabStatus} onClick={() => {
            if(targetMain.current)targetMain.current.scrollIntoView({ behavior: "smooth" })
          }}>
            Начинки
          </Tab>
        </div>
        <CustomScrollbar customHeight={716} customOffsetBottom={52} sizeType="small">
          <div ref={targetBun}>
            <h2 className='text text_type_main-medium pb-6'>Булки</h2>
            <ul className={`${styles.ingredientList} pl-1 pr-1 pb-2`} ref={refBun}>
              {buns.map((foodElement, index) => {
                return <IngredientCard
                  menuIndex={index}
                  bunFlag={true}
                  key={buns[index].ingredientData._id} />
              })}
            </ul>
          </div>
          <div ref={targetSouce}>
            <h2 className='text text_type_main-medium pb-6'>Соусы</h2>
            <ul className={`${styles.ingredientList} pl-1 pr-1 pb-2`} ref={refSouce}>
              {ingredients.map((ingredient, index) => {
                if (ingredient.ingredientData.type === "sauce") {
                  return <IngredientCard
                    menuIndex={index}
                    bunFlag={false}
                    key={ingredient.ingredientData._id}
                  />
                }
              })}
            </ul>
          </div>
          <div ref={targetMain}>
            <h2 className='text text_type_main-medium pb-6'>Начинки</h2>
            <ul className={`${styles.ingredientList} pl-1 pr-1 pb-2`} ref={refMain}>
              {ingredients.map((ingredient, index) => {
                if (ingredient.ingredientData.type === "main") {
                  return <IngredientCard
                    menuIndex={index}
                    bunFlag={false}
                    key={ingredient.ingredientData._id}
                  />
                }
              })}
            </ul>
          </div>

        </CustomScrollbar>
      </section>
      {location.state && location.state.foregroundIngredient
        //modalData === OPEN_INGREDIENT_FOCUS && <Modal onClose={closeModalCallback}>
        && <Modal onClose={closeModalCallback}>
          <div className='pt-10 pb-15 pr-10 pl-10'>
            <IngredientDetails/>
          </div>
        </Modal>
      }
    </>
  );
}
export default BurgerIngredients;

