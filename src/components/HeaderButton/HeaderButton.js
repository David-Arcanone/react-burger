
import './styles.css';
import PropTypes from "prop-types";

function HeaderButton({message, clickCallBack, statusActive, addClass, children}) {
  const onMenuButtonClick =()=>{
    clickCallBack(message);
  }
  //Вместо Anchor пока кнопка
  return (
    <button className={'header-menu-button pt-4 pb-4 pr-5 pl-5 '+addClass} onClick={onMenuButtonClick}>
      {children}
      <p className={"text text_type_main-default ml-2"+ (statusActive ?"":" text_color_inactive")}>{message}</p>
    </button>
  );
}
HeaderButton.propTypes ={
  message: PropTypes.string.isRequired,
  clickCallBack: PropTypes.func.isRequired,
  statusActive: PropTypes.bool.isRequired,
  addClass: PropTypes.string,
  children: PropTypes.node.isRequired
}



export default HeaderButton;