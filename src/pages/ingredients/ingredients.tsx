
import { useParams } from 'react-router-dom';
import styles from './ingredients.module.css';
import React from 'react';
import { IngredientDetailsInfo } from '../../components/IngredientDetailsInfo/IngredientDetailsInfo';

const Ingredients:React.FC=()=> {
  const { id } = useParams();
  return (
    <main className={styles.main}>
      <IngredientDetailsInfo isModal={false} id={id ??""}/>
    </main>
  );
}
export default Ingredients;