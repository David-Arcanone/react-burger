
import {CurrencyIcon,Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import './styles.css';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types/types'
function IngredientCard({food, itemCallback,count}) {
  return (<>
    {
      food && 
      <li className="IngredientCard pl-3 pr-3 pb-8" onClick={()=>{itemCallback(food)}}>
        <img src={food.image} alt={food.name} className="pl-4 pr-4"></img>
        <div className='price-line mt-1 mb-1'>
          <p className='text text_type_digits-default mr-2'>{food.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className='food-name text text_type_main-default'>{food.name}</p>
        {count>0 &&<Counter count={count} size="default" extraClass="mr-3" />}
      </li>
    }
  </>
  );
}
IngredientCard.propTypes={
  food: ingredientType.isRequired,
  itemCallback: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
}
export default IngredientCard;