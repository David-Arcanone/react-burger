

import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
  const { currentFood} = useSelector(state => state.ingredientDetails);
  return (
    <div className={styles.IngredientDetails}>
      <h2 className={`text text_type_main-large ${styles.headerForModal} pt-3 pb-3`}>Детали ингредиента</h2>
      <img alt={currentFood.name} src={currentFood.image_large} />
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
  );
}

