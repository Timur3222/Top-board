import { useContext } from 'react';
import axios from 'axios';
import styles from './Order.module.scss'
import KeyboardCard from '../KeyboardCard';
import AppContext from '../../context';

function Order({ id, order, isLoaded }) {

  const { setOrders } = useContext(AppContext);

  const renderList = () => {
    return order.orderItems.map(keyboard => (
      <KeyboardCard
        keyboard = {keyboard}
        key = {keyboard.id}
        isInOrders = {true}
        isLoaded = {isLoaded}
      />
    ))
  }

  const renderFakeList = () => {
    return [...Array(3)].map(() => (
      <KeyboardCard
        isLoaded = {isLoaded}
      />
    ))
  }

  const cancelOrder = async () => {
    try {
      await axios.delete(`http://localhost:3001/orders/${order.id}`);
      setOrders(prev => prev.filter(item => item.id !== order.id));

    } catch (error) {
      alert('Не удалось отменить заказ. Обновите страницу и попробуйте еще раз.')
    }
  }

  const summary = order.orderItems.reduce((summ, item) => {return summ + +item.price}, 0);

  return (
    <div className={styles.order}>
      <div className={styles.info}>
        <h3>Заказ № {id}</h3>
        <span>
          Сумма: <b>{summary}</b> руб.
        </span>
        <span>
          Заказ будет передан курьерской службе в течении суток.
          Вы можете <button onClick={cancelOrder}>отменить заказ.</button>
        </span>
      </div>
      <div className={styles.order_items}>
        {isLoaded ? renderList() : renderFakeList()}
      </div>
    </div>
  )
}

export default Order
