import { Link } from "react-router-dom";
import { useContext } from "react";
import styles from './Information.module.scss';
import AppContext from '../../context';

function Information({ isInCart, orderCheck, isInFav, isInOrders, orderId }) {

  const { closeCart } = useContext(AppContext);

  return (
    <div className={styles.information}>
      {isInFav && <div className={styles.fav}>
      <span>У вас нету избранных товаров</span>
        <img src="icons/broken-heart.png" alt="broken-heart" />
        <Link to='/'>
          <button>Вернуться назад</button>
        </Link>
      </div>}
      
      {isInOrders && <div className={styles.orders}>
      <span>У вас нету заказов</span>
        <img src="icons/no-orders.png" alt="no-orders" />
        <Link to='/'>
          <button>Вернуться назад</button>
        </Link>
      </div>}

      {orderCheck ? <div className={styles.cart}>
        <b>Заказ оформлен!</b>
        <img src="icons/check.png" alt="check" />
        <span>Ваш заказ <b>№ {orderId}</b> скоро будет передан курьерской службе.</span>
        <button onClick={closeCart}>Вернуться назад</button>
      </div> : isInCart &&
      <div className={styles.cart}>
        <span>Корзина пуста</span>
        <img src="icons/empty.png" alt="empty" />
        <button onClick={closeCart}>Вернуться назад</button>
      </div>}
    </div>
  )
}

export default Information
