import styles from './IngredientDetails.module.css';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { IngredientDetailsInfo } from '../IngredientDetailsInfo/IngredientDetailsInfo';
export const IngredientDetails:React.FC=()=> {
  const id = useLocation().state.foregroundIngredient;
  return (
    <main className={styles.main}>
      <IngredientDetailsInfo id={id} isModal={true}/>
    </main>
  );
}
