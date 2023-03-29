
import { useParams } from 'react-router-dom';
import styles from './profileOrdersID.module.css';
import React from 'react';
import OrderDetailsFromList from '../../components/OrderDetailsFromList/OrderDetailsFromList';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import { wsProfileOrdersConnectionEnd, wsProfileOrdersConnectionStart } from '../../services/actions/wsProfileOrders/wsProfileOrders';

export const ProfileOrdersID: React.FC = () => {
  const { id } = useParams();
  const dispatch = useBurgerAppDispatch();
  const { ordersList, firstPack } = useBurgerAppSelector((state) => state.profileOrders);
  React.useEffect(() => {
    console.log("start ws ")
    dispatch(wsProfileOrdersConnectionStart());
    return () => { dispatch(wsProfileOrdersConnectionEnd()); console.log("end ws") };
  }, [dispatch]);
  return (
    <main className={styles.main}>
      <div className={`${styles.profileOrdersElement}`}>
      {(firstPack && ordersList) ?<OrderDetailsFromList isModal={false} orderCurrent={ordersList.find((order) => order._id === id) ?? ordersList[0]} />
        : <p className='text text_type_main-large '>загрузка</p>
      }</div> 
    </main>
  );
}
