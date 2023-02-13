import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import './styles.css';
const modalReact=document.getElementById("modalReact");
const Modal =({onClose, children}) => {
const modalRoot = document.getElementById("modal-container");
    React.useEffect(()=>{
        const handleEsc =(evt)=>{
            evt.key ==="Escape" && onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return ()=> {document.removeEventListener("keydown", handleEsc);
      };
    },[onClose]);

  return ReactDOM.createPortal(
    <div className='Modal'>
      <div className='modal-box'>
        {children}
        <div className='exit pt-15 pr-10'><CloseIcon type="primary" onClick={onClose}/></div>
      </div>
      <ModalOverlay closeModalFunction={onClose}/>
      {/*<div className='Overlay' onClick={onClose}></div>{/* Нет необходимости создовать отдельный модуль для Оверлея ModalOverlay*/}
    </div>,  
    modalReact
  );
};
Modal.propTypes ={
  onClose: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired
}
export default Modal;