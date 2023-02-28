import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
const modalReact = document.getElementById("modalReact");
const Modal = ({ onClose,children  }) => {
  React.useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  /*const onClickCallback=()=>{
    onClose();
  }*/
  return ReactDOM.createPortal(
    <div className={styles.Modal}>
      <div className={styles.modalBox}>
        {children}
        <div className={`${styles.exit} pt-15 pr-10`}><CloseIcon type="primary" onClick={onClose} /></div>
      </div>
      <ModalOverlay closeModalFunction={onClose} />
    </div>,
    modalReact
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired,
}
export default Modal;