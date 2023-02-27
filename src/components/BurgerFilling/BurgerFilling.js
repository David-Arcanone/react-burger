

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerFilling.module.css';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredientFromConstructor, moveIngredient } from '../../services/actions/BurgerConstructor/BurgerConstructor';
import { decreaseIngredientCount } from '../../services/actions/BurgerIngredients/BurgerIngredients';
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

function BurgerFilling({ menuIndex, uuID, order }) {
    const { name, price, image_mobile, _id } = useSelector(state => state.burgerConstructor.ingredientsMenu[menuIndex]);
    const dispatch = useDispatch();
    const [{ isDrag }, dragRef] = useDrag({
        type: "burgerFilling",
        item: { order: order },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });
    const [, dropTarget] = useDrop({
        accept: "burgerFilling",
        drop(data) {
            console.log(`target ${order} initial ${data.order}`);
            dispatch(moveIngredient(order, data.order));
        },
    });

    return (!isDrag &&
        <li ref={dragRef}>
            <div className={`${styles.ConstructorIngredientElement} pr-2`} ref={dropTarget}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image_mobile}
                    handleClose={() => {
                        dispatch(deleteIngredientFromConstructor(uuID, menuIndex));
                        dispatch(decreaseIngredientCount(_id));
                    }}
                />
            </div>



        </li>


    );
}
BurgerFilling.propTypes = {
    menuIndex: PropTypes.number.isRequired,
    uuID: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired
}
export default BurgerFilling;