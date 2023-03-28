
import styles from "./profileOrders.module.css";
import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { makeLogOut } from '../../services/actions/Login/Login';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import { wsProfileOrdersConnectionEnd, wsProfileOrdersConnectionStart } from "../../services/actions/wsProfileOrders/wsProfileOrders";
import { LogOrderCard } from "../../components/LogOrderCard/LogOrderCard";
import Modal from "../../components/Modal/Modal";
import OrderDetailsFromList from "../../components/OrderDetailsFromList/OrderDetailsFromList";

const ProfileOrders: React.FC<{ closeModal: () => void; }> = ({ closeModal }) => {
    const dispatch = useBurgerAppDispatch();
    const location = useLocation();
    const { isGettingProfileInfo, isSendingNewProfileInfo } = useBurgerAppSelector(state => state.profile);//вдруг с профиля изменили и сразу перешли
    const { loginStateChange, isLogged } = useBurgerAppSelector(state => state.login);
    const { ordersList } = useBurgerAppSelector((state) => state.profileOrders);
    useEffect(() => {
        console.log("start ws profile")
        dispatch(wsProfileOrdersConnectionStart());
        return () => {
            dispatch(wsProfileOrdersConnectionEnd());
            console.log("end ws profile")
        };
    }, [dispatch]);
    if (loginStateChange && !isLogged) return <Navigate to="/login" replace={true} />;
    return (<>
        <main className={styles.main}>
            <div className={styles.collumn}>
                <Link to={{ pathname: `/profile` }} className={`${styles.navLink} ${styles.menuItem}`}><p className="text text_type_main-medium text_color_inactive">Профиль</p></Link>
                <h1 className={`text text_type_main-medium ${styles.menuItem}`}>История заказов</h1>
                <Link to={{ pathname: `` }} className={`${styles.navLink} ${styles.menuItem}`} onClick={(e) => { e.preventDefault(); dispatch(makeLogOut()) }}><p className="text text_type_main-medium text_color_inactive">Выход</p></Link>
                <p className="text text_type_main-default text_color_inactive pt-20">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            {(isGettingProfileInfo || isSendingNewProfileInfo) ? <p className="text text_type_main-large">ЗАГРУЗКА...</p> :
                <div className={styles.collumnOrders}>
                    <CustomScrollbar customHeight={916} customOffsetBottom={64} sizeType="big">
                        <div className={styles.filterColumn}>
                            {ordersList.map((order) => <div className={`${styles.logOrderCardContainer}`}>
                                <LogOrderCard order={order} isProfile={true} />
                            </div>)}
                        </div>
                    </CustomScrollbar>  </div>}
        </main>
        {location.state && location.state.foregroundIngredient
        && <Modal onClose={closeModal}>
          <div className={`pt-15 pb-15 pr-10 pl-10 ${styles.profileModal}`}>
            <OrderDetailsFromList isModal={true} orderCurrent={ordersList.find((order)=>order._id===location.state.foregroundIngredient)??ordersList[0]}/>
          </div>
        </Modal>
      }
    </>
    );
}
export default ProfileOrders;