

//import React from 'react';
import './styles.css';
//import PropTypes from "prop-types";
import { ingredientType } from '../../utils/types/types';

export default function IngredientDetails({foodData}) {
  return (
    <div className='IngredientDetails'>
        <h2 className='text text_type_main-large headerForModal pt-3 pb-3'>Детали ингредиента</h2>
        <img alt={foodData.name} src={foodData.image_large}/>
        <h3 className='text text_type_main-medium pb-8 pt-4'>{foodData.name}</h3>
        <div className='caloriesTable text_color_inactive'>
            <p className='text text_type_main-default'>Калории,ккал</p>
            <p className='text text_type_main-default'>Белки, г</p>
            <p className='text text_type_main-default'>Жиры, г</p>
            <p className='text text_type_main-default'>Углеводы, г</p>
            <p className='text text_type_digits-default'>{foodData.calories}</p>
            <p className='text text_type_digits-default'>{foodData.proteins}</p>
            <p className='text text_type_digits-default'>{foodData.fat}</p>
            <p className='text text_type_digits-default'>{foodData.carbohydrates}</p>
        </div>
    </div>
  );
}
IngredientDetails.propTypes={
    foodData: ingredientType
};


