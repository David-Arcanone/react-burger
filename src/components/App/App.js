import { useEffect } from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import { downloadIngredients } from "../../services/actions/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { readyIngredients } = useSelector(state => state.burgerIngredients);
  useEffect(() => {
    dispatch(downloadIngredients());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      {readyIngredients && <>
        <AppHeader />
        {<main className={`${styles.main} pb-10`}>
          <DndProvider backend={HTML5Backend}>
            {/*левая половина панель ингредиентов*/}
            <BurgerIngredients />
            {/*правая половина конструктор*/}
            <BurgerConstructor />
          </DndProvider>
        </main>}
      </>
      }
    </div>
  );
}
export default App;

