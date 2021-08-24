import { useState, useContext } from 'react';
import axios from 'axios';
import styles from './Cart.module.scss';
import KeyboardCard from '../KeyboardCard';
import Information from '../Information';
import AppContext from '../../context';


function Cart({ isLoaded, isCartOpened, orderItems = [] }) {

  const { cart, setCart, closeCart, setOrders, orderCheck, setOrderCheck} = useContext(AppContext);
  const [orderId, setOrderId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const checkOrder = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post('http://localhost:3001/orders', {orderItems: cart});
      clearCart();

      setOrderId(data.id);
      setOrders(prev => [...prev, data])
      setOrderCheck(true);
      setIsLoading(false);
    } catch (error) {
      alert('Не удалось создать заказ. Обновите страницу и попробуйте еще раз.')
    }
  }

  const clearCart = async () => {
    try {
      await cart.forEach(item => {
        axios.delete(`http://localhost:3001/cart/${item.id}`);
        setCart([]);
      });      
    } catch (error) {
      alert('Не удалось очистить корзину. Обновите страницу и попробуйте еще раз.')
    }
  }

  const summary = cart.reduce((summ, item) => {return summ + +item.price}, 0);
console.log(isCartOpened)
  return (
    <div className={isCartOpened ? styles.overlay_active : styles.overlay}>
      <div onClick={closeCart} className={styles.close_click}></div>
      <div className={isCartOpened ? styles.cart_active : styles.cart}>
        <div className={styles.cart_title}>
          <h2>Корзина</h2>
          {cart.length > 0 && <button onClick={clearCart}>Очистить корзину</button>}
        </div>
        
        {cart.length ? <div className={styles.cart_items}>
          {cart.map((keyboard) =>(
            <KeyboardCard
              setCart ={setCart}
              keyboard = {keyboard}
              key = {keyboard.id}
              isLoaded = {isLoaded}
              isInCart
              added
            />
          ))}
          </div> :
            <Information
              isInCart = {true}
              orderCheck = {orderCheck}
              isInFav = {false}
              orderId = {orderId}
            />
          }

        {cart.length > 0 && <div className={styles.order_checkout}>
          {isLoading ? <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div> : 
          <ul>
            <li>
              <span>Итого:</span>
              <div className={styles.dashed_line}></div>
              <b>{cart.length && `${summary} руб.`}</b>
            </li>
            <li>
              <span>Бонусы:</span>
              <div className={styles.dashed_line}></div>
              <b>{`+${Math.round(summary * 0.05)} бонусов`}</b>
            </li>
            <li>
              <button>
              <b onClick={checkOrder}>Оформить заказ</b>
              </button>
            </li>
          </ul>}
        </div>}
      </div>
    </div>
  )
}

export default Cart
