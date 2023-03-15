
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ingredients.module.css';

function Ingredients() {
  const { id } = useParams();
  const { buns, ingredients } = useSelector(state => state.burgerIngredients);
  const currentFood = [...buns, ...ingredients].reduce(
    (accumulator, currentIngredient) => {
      if (currentIngredient.ingredientData._id === id) { return currentIngredient.ingredientData }
      return accumulator;
    }, {});
    
  return (
    <main className={styles.main}>
      {JSON.stringify(currentFood) === '{}' ? <h1>Запрошенного ингредиента нет в базе</h1>
        : <>
        <div className={styles.IngredientDetails}>
          <h1 className={`text text_type_main-large pt-3 pb-3`}>Детали ингредиента</h1>
          <img alt={currentFood.name} src={currentFood.image_large} />
          <h3 className='text text_type_main-medium pb-8 pt-4'>{currentFood.name}</h3>
          <div className={`${styles.caloriesTable } text_color_inactive`}>
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
export default Ingredients;