import { useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../context';
import Information from '../components/Information';
import Order from '../components/Order';

function Orders({ isLoaded, orders }) {

  const { setOrders } = useContext(AppContext)

  useEffect(async () => {
    try {
      const orderItems = await axios.get('http://localhost:3001/orders');
      setOrders(orderItems.data);

    } catch (error) {
      alert('Не удалось загрузить заказы. Обновите страницу и попробуйте еще раз.')
    }
  }, [])

  const renderOrder = () => {
    return orders.map(item => (
      <Order
        id = {item.id}
        order = {item}
        isLoaded = {isLoaded}
      />
    ))
  }

  return (
    <>
      <h2 className='orders-title'>Мои заказы</h2>
      {orders.length ?
        renderOrder() :
        <Information
          isInCart = {false}
          orderCheck = {false}
          isInFav = {false}
          isInOrders = {true}
        />
      }
    </>
  )
}

export default Orders
