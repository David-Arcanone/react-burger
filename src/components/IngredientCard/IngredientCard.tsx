
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css';
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { TIngredientCardProps } from '../../services/types/IngredientCard/IngredientCard';
import { useBurgerAppSelector } from '../../utils/hooks/hooks';
const IngredientCard:React.FC<TIngredientCardProps>=({ menuIndex, bunFlag })=> {
  const { buns, ingredients } = useBurgerAppSelector(state => state.burgerIngredients);
  const menuLibrary = bunFlag ? buns[menuIndex] : ingredients[menuIndex];
  const navigate = useNavigate();
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { menuIndex, bunFlag },
  });
  return (<>
    {
      menuLibrary &&
      <li ref={dragRef} className={`${styles.IngredientCard} pl-3 pr-3 pb-8`} onClick={() => {
        navigate(`/ingredients/${menuLibrary.ingredientData._id}`,
          { state: { background: location, foregroundIngredient: menuLibrary.ingredientData._id }});
      }}>
        <img src={menuLibrary.ingredientData.image} alt={menuLibrary.ingredientData.name} className="pl-4 pr-4"></img>
        <div className={`${styles.priceLine} mt-1 mb-1`}>
          <p className='text text_type_digits-default mr-2'>{menuLibrary.ingredientData.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.foodName} text text_type_main-default`}>{menuLibrary.ingredientData.name}</p>
        {menuLibrary.qty > 0 && <Counter count={menuLibrary.qty} size="default" extraClass="mr-3" />}
      </li>
    }
  </>
  );
}
export default IngredientCard;