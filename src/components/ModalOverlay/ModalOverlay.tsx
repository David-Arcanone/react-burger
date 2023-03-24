import React from 'react';
import styles from './ModalOverlay.module.css';
import { TModalOverlayProps } from '../../services/types/ModalOverlay/ModalOverlay';
const ModalOverlay:React.FC<TModalOverlayProps>=({ closeModalFunction })=> {
  return (
    <div className={styles.Overlay} onClick={closeModalFunction} />
  );
}
export default ModalOverlay;

