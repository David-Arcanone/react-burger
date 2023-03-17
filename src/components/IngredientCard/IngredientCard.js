
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css';
import PropTypes from "prop-types";
//import { ingredientType } from '../../utils/types/types';
import { /*useDispatch,*/ useSelector } from 'react-redux';
//import { changeCurrentFocusIngredient } from '../../services/actions/IngredientDetails/IngredientDetails';
import { useDrag } from "react-dnd";

import { useNavigate, useLocation } from 'react-router-dom';
//import { openIngredientFocus } from '../../services/actions/Modal/Modal';

function IngredientCard({ menuIndex, bunFlag }) {
  const { buns, ingredients } = useSelector(state => state.burgerIngredients);
  const menuLibrary = bunFlag ? buns[menuIndex] : ingredients[menuIndex];//не могу сразу обратиться к индексу т.к. реализовал с 2мя аррэй
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [{ }, dragRef] = useDrag({
    type: "ingredient",
    item: { menuIndex, bunFlag },
  });
  return (<>
    {
      menuLibrary &&
      <li ref={dragRef} className={`${styles.IngredientCard} pl-3 pr-3 pb-8`} onClick={() => {
        //dispatch(changeCurrentFocusIngredient(menuLibrary.ingredientData));
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
IngredientCard.propTypes = {
  menuIndex: PropTypes.number.isRequired,
  bunFlag: PropTypes.bool.isRequired
}
export default IngredientCard;