import styles from './ModalOverlay.module.css';
import PropType from "prop-types";
function ModalOverlay({ closeModalFunction }) {
  return (
    <div className={styles.Overlay} onClick={closeModalFunction} />
  );
}
ModalOverlay.PropType = {
  closeModalFunction: PropType.func.isRequired
};
export default ModalOverlay;

