import './styles.css';
import PropType from "prop-types";
function ModalOverlay({closeModalFunction}) {
  return (
      <div className="Overlay" onClick={closeModalFunction}/>
  );
}
ModalOverlay.PropType={
  closeModalFunction: PropType.func.isRequired
};
export default ModalOverlay;

