import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { TModalProps } from '../../services/types/Modal/Modal';
const modalReact = document.getElementById("modalReact")!;
const Modal:React.FC<TModalProps> = ({ onClose,children}) => {
  React.useEffect(() => {
    const handleEsc = (evt:KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
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
export default Modal;