
import { useParams } from 'react-router-dom';
import styles from './feedOrdersID.module.css';
import React from 'react';
import OrderDetailsFromList from '../../components/OrderDetailsFromList/OrderDetailsFromList';
import { useBurgerAppDispatch, useBurgerAppSelector } from '../../utils/hooks/hooks';
import { wsFeedSConnectionEnd, wsFeedSConnectionStart } from '../../services/actions/wsFeed/wsFeed';

export const FeedOrdersID: React.FC = () => {
  const { id } = useParams();
  const dispatch = useBurgerAppDispatch();
  const { ordersList, firstPack } = useBurgerAppSelector((state) => state.feed);
  React.useEffect(() => {
    console.log("start ws")
    dispatch(wsFeedSConnectionStart());
    return () => { dispatch(wsFeedSConnectionEnd()); console.log("end ws") };
  }, [dispatch]);
  return (
    <main className={styles.main}>
      {(firstPack&&ordersList) ? <div className={`${styles.profileOrdersElement}`}>
        <OrderDetailsFromList isModal={false} orderCurrent={ordersList.find((order) => order._id === id) ?? ordersList[0]} />
      </div> : <p>загрузка</p>
      }
    </main>
  );
}
