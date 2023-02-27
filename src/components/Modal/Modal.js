import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, OPEN_INGREDIENT_FOCUS, OPEN_ORDER_INFO } from '../../services/actions/Modal/Modal';
import { clearCurrentIngredient } from '../../services/actions/IngredientDetails/IngredientDetails';
import { clearOrder } from '../../services/actions/BurgerConstructor/BurgerConstructor';

const modalReact = document.getElementById("modalReact");
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { modalData } = useSelector(state => state.modal);
  const CloseModalFunction = () => {
    
    switch (modalData) {
      case (OPEN_ORDER_INFO): {
        dispatch(clearOrder());
        break;
      }
      case (OPEN_INGREDIENT_FOCUS): {
        dispatch(clearCurrentIngredient());
        break;
      }
      default: {
        break;
      }
      
    };
    dispatch(closeModal());
  }

  React.useEffect(() => {

    const handleEsc = (evt) => {
      if (evt.key === "Escape") {
        CloseModalFunction();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [CloseModalFunction]);

  return ReactDOM.createPortal(
    <div className={styles.Modal}>
      <div className={styles.modalBox}>
        {children}
        <div className={`${styles.exit} pt-15 pr-10`}><CloseIcon type="primary" onClick={CloseModalFunction} /></div>
      </div>
      <ModalOverlay closeModalFunction={CloseModalFunction} />
    </div>,
    modalReact
  );
};
Modal.propTypes = {
  children: PropTypes.node.isRequired
}
export default Modal;