import { useEffect } from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import styles from './BurgerIngredients.module.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar';
import { useDispatch, useSelector } from 'react-redux';

import { useInView } from 'react-intersection-observer';
import { refreshTabs } from '../../services/actions/BurgerIngredients/BurgerIngredients';
import { OPEN_INGREDIENT_FOCUS } from '../../services/actions/Modal/Modal';
function BurgerIngredients() {
  const dispatch = useDispatch();
  const { bunsTabStatus, souceTabStatus, mainTabStatus, ingredients, buns} = useSelector(state => state.burgerIngredients);
  const { modalData } = useSelector(state => state.modal);
  //для работы Tab
  const [refBun, inViewBun] = useInView({ threshold: 0.2, });
  const [refSouce, inViewSouce] = useInView({ threshold: 0.2, });
  const [refMain, inViewMain] = useInView({ threshold: 0.2, });

  useEffect(() => {
    dispatch(refreshTabs(inViewBun, inViewSouce, inViewMain));
  }, [inViewBun, inViewSouce, inViewMain]);


  return (
    <>
      <section className={`${styles.BurgerIngredients} mr-5 ml-5`}>
        <h1 className='pt-10 pb-5 text text_type_main-large'>Соберите бургер</h1>
        <div className={`pb-8 ${styles.tabContainer}`}>
          <Tab value="buns" active={bunsTabStatus} >
            Булки
          </Tab>
          <Tab value="sauce" active={souceTabStatus} >
            Соусы
          </Tab>
          <Tab value="main" active={mainTabStatus} >
            Начинки
          </Tab>
        </div>
        <CustomScrollbar customHeight={716} customOffsetBottom={52}>
          <h2 className='text text_type_main-medium pb-6'>Булки</h2>

          <ul ref={refBun} className={`${styles.ingredientList} pl-1 pr-1 pb-2`}>
            {buns.map((foodElement, index) => {
              return <IngredientCard
                menuIndex={index}
                bunFlag={true}
                key={buns[index].ingredientData._id} />
            })}
          </ul>

          <h2 className='text text_type_main-medium pb-6'>Соусы</h2>
          <ul ref={refSouce} className={`${styles.ingredientList} pl-1 pr-1 pb-2`}>
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
          <h2 className='text text_type_main-medium pb-6'>Начинки</h2>
          <ul ref={refMain} className={`${styles.ingredientList} pl-1 pr-1 pb-2`}>
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
        </CustomScrollbar>
      </section>
      {
        modalData === OPEN_INGREDIENT_FOCUS && <Modal>
          <div className='pt-10 pb-15 pr-10 pl-10'>
            <IngredientDetails />
          </div>
        </Modal>}
    </>
  );
}
BurgerIngredients.propTypes = {
};
export default BurgerIngredients;

