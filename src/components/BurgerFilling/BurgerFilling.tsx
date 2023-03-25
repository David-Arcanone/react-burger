

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerFilling.module.css';
import { deleteIngredientFromConstructor, moveIngredient } from '../../services/actions/BurgerConstructor/BurgerConstructor';
import { decreaseIngredientCount } from '../../services/actions/BurgerIngredients/BurgerIngredients';
import { useDrag, useDrop } from "react-dnd";
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import React from "react";
import { TBurgerFillingDropPayload, TBurgerFillingProps } from '../../services/types/BurgerFilling/BurgerFilling';
//const BurgerFilling =({ menuIndex, uuID, order }:TBurgerFillingProps):React.ReactNode=> {
const BurgerFilling: React.FC<TBurgerFillingProps> = ({ menuIndex, uuID, order }) => {
    const { name, price, image_mobile, _id } = useBurgerAppSelector(state => state.burgerConstructor.ingredientsMenu[menuIndex]);
    const dispatch = useBurgerAppDispatch();
    const [{ isDrag }, dragRef] = useDrag({
        type: "burgerFilling",
        item: { order: order },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });
    const [, dropTarget] = useDrop({
        accept: "burgerFilling",
        drop(data: TBurgerFillingDropPayload) {
            console.log(`target ${order} initial ${data.order}`);
            dispatch(moveIngredient(order, data.order));
        },
    });

    if (isDrag) { return null };

    return (
        <li ref={dragRef}>
            <div className={`${styles.ConstructorIngredientElement} pr-2`} ref={dropTarget}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name ?? ""}
                    price={price ?? 0}
                    thumbnail={image_mobile ?? ""}
                    handleClose={() => {
                        dispatch(deleteIngredientFromConstructor(uuID, menuIndex));
                        dispatch(decreaseIngredientCount(_id ?? ""));
                    }}
                />
            </div>
        </li>
    );
}
export default BurgerFilling;