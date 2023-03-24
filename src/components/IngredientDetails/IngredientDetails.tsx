import styles from './IngredientDetails.module.css';
import { useLocation } from 'react-router-dom';
import { useBurgerAppSelector } from '../../utils/hooks/hooks';
import { IIngredient } from '../../services/types/BurgerConstructor/BurgerConstructor';
import React from 'react';
export const IngredientDetails:React.FC=()=> {
  const { buns, ingredients } = useBurgerAppSelector(state => state.burgerIngredients);
  const id = useLocation().state.foregroundIngredient;
  const currentFood:IIngredient = [...buns, ...ingredients].reduce(
    (accumulator, currentIngredient) => {
      if (currentIngredient.ingredientData._id === id) { return currentIngredient.ingredientData }
      return accumulator;
    }, {});
  return (
    <main className={styles.main}>
      {JSON.stringify(currentFood) === '{}' ? <h1>Загрузка</h1>
        : <>
          <div className={styles.IngredientDetails}>
            <h1 className={`text text_type_main-large ${styles.headerForModal} pt-3 pb-3`}>Детали ингредиента</h1>
            <img alt={currentFood.name ?? "ошибка"} src={currentFood.image_large} />
            <h3 className='text text_type_main-medium pb-8 pt-4'>{currentFood.name}</h3>
            <div className={`${styles.caloriesTable} text_color_inactive`}>
              <p className='text text_type_main-default'>Калории,ккал</p>
              <p className='text text_type_main-default'>Белки, г</p>
              <p className='text text_type_main-default'>Жиры, г</p>
              <p className='text text_type_main-default'>Углеводы, г</p>
              <p className='text text_type_digits-default'>{currentFood.calories}</p>
              <p className='text text_type_digits-default'>{currentFood.proteins}</p>
              <p className='text text_type_digits-default'>{currentFood.fat}</p>
              <p className='text text_type_digits-default'>{currentFood.carbohydrates}</p>
            </div>
          </div>
        </>
      }
    </main>
  );
}