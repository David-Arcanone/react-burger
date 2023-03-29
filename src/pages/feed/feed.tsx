
import React from "react";
import styles from './feed.module.css';
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import { useBurgerAppDispatch, useBurgerAppSelector } from "../../utils/hooks/hooks";
import { wsFeedSConnectionEnd, wsFeedSConnectionStart } from "../../services/actions/wsFeed/wsFeed";
import { LogOrderCard } from "../../components/LogOrderCard/LogOrderCard";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import OrderDetailsFromList from "../../components/OrderDetailsFromList/OrderDetailsFromList";

const Feed: React.FC<{ closeModal: () => void; }> = ({ closeModal }) => {
  const dispatch = useBurgerAppDispatch();
  const location = useLocation();
  const { ordersList, total, totalToday,firstPack } = useBurgerAppSelector((state) => state.feed);
  React.useEffect(() => {
    console.log("start ws")
    dispatch(wsFeedSConnectionStart());
    return () => { dispatch(wsFeedSConnectionEnd()); console.log("end ws") };
  }, [dispatch]);
  return (<>
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.panels}>
        <CustomScrollbar customHeight={872} customOffsetBottom={60} sizeType="small">
          <ul className={styles.feedListUL}>
            {ordersList.map((order,index) => <li className={`${styles.logOrderCardContainer}`} key={index}>
              <LogOrderCard order={order} isProfile={false} />
            </li>)}
          </ul>
        </CustomScrollbar>
        <div>
          <div className={`${styles.statusOfOrders} pb-15`}>
            <div>
              <h2 className="text text_type_main-medium pb-6 ">Готовы:</h2>
              <ul className={styles.listOfOrders}>
                {
                  ordersList.filter((order) => (order.status === "done")).map((order, index) => {
                    if (index > 19) return null;
                    return <li key={`1-${index}`} className={`text text_type_digits-default ${styles.ordersThatAreReady} ${styles.ordersInListColumns}`}>
                      {order.number}
                    </li>
                  })
                }
              </ul>
            </div>
            <div>
              <h2 className="text text_type_main-medium pb-6 ">В работе:</h2>
              <ul className={styles.listOfOrders}>
                {
                  ordersList.filter((order) => (order.status !== "done")).map((order, index) => {
                    if (index > 19) return null;
                    return <li key={`2-${index}`} className={`text text_type_digits-default ${styles.ordersInListColumns}`}>
                      {order.number}
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
          <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
          <p className="text text_type_digits-large pb-15">{total}</p>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </main>
    {location.state && location.state.foregroundIngredient
        //modalData === OPEN_INGREDIENT_FOCUS && <Modal onClose={closeModalCallback}>
        && <Modal onClose={closeModal}>
          <div className={`pt-15 pb-15 pr-10 pl-10 ${styles.feedModal}`}>
            {firstPack?<OrderDetailsFromList isModal={true} orderCurrent={ordersList.find((order)=>order._id===location.state.foregroundIngredient)??ordersList[0]}/>
            :<p className="text text_type_main-large ">загрузка</p>}
          </div>
        </Modal>
      }
  </>

  );
}
export default Feed;