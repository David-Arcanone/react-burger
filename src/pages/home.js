
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import styles from './home.module.css';
import PropTypes from 'prop-types';

function HomePage({closeModal}) {
    return (
          <main className={`${styles.main} pb-10`}>
            {/*левая половина панель ингредиентов*/}
            <BurgerIngredients closeModalCallback={closeModal} />
            {/*правая половина конструктор*/}
            <BurgerConstructor closeModalCallback={closeModal} />
          </main>
    );
  }
  HomePage.propTypes = {
    closeModal: PropTypes.func.isRequired,
  };
  export default HomePage;