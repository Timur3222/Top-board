import { useContext } from 'react';
import axios from 'axios';
import styles from './KeyboardCard.module.scss';
import AppContext from '../../context';


function KeyboardCard({ keyboard, setCart, setFavorites, isInCart, isInOrders, isLoaded }) {

  const { isAdded, isFavorite } = useContext(AppContext);

  const cartHandler = async () => {
    try {
      if (isAdded(keyboard.id)) {
        axios.delete(`http://localhost:3001/cart/${keyboard.id}`)
        setCart(
          prev => prev.filter(item => item.id !== keyboard.id)
        )
      } else {
        const { data } = await axios.post('http://localhost:3001/cart/', keyboard);
        setCart(
          prev => prev.includes(keyboard) ? [...prev] : [...prev, data]
        );
      }
    } catch (error) {
        alert('Не удалось добавить в корзину.')
    }
  }

  const favoritesHandler = async () => {
    try {
      if (isFavorite(keyboard.id)) {
        axios.delete(`http://localhost:3001/favorites/${keyboard.id}`)
        setFavorites(
          prev => prev.filter(item => item.id !== keyboard.id)
        )
      } else {
        const { data } = await axios.post('http://localhost:3001/favorites', keyboard);
        setFavorites(
          prev => prev.includes(keyboard) ? [...prev] : [...prev, data]
        );
      }
    } catch (error) {
        alert('Не удалось добавить в избранное.')
    }
  }

  return ( 
    <div className={styles.keyboard_card}>
      {isLoaded ?
        <>
          <b>{keyboard.title}</b>
          <img className={styles.keyboard_img} src={keyboard.image} alt='keyboard-img' />
          <div className={styles.price}>
            <span>Цена: <b>{keyboard.price} руб.</b></span>

            {isInCart ?
            <div className={styles.buttons}>
              <button
                className={styles.remove}
                onClick={cartHandler}
                style={{backgroundColor: '#d3d3d3'}}
              >
                <img
                  src='icons/remove.png'
                  alt='remove'
                />
              </button>
            </div> : isInOrders ? <></> :
            <div className={styles.buttons}>
              <button
                style={isAdded(keyboard.id) ? {backgroundColor: '#5ec4ff'} : {backgroundColor: '#d3d3d3'}}
                onClick={cartHandler}
                className={styles.add}
              >
                <img
                  src={isAdded(keyboard.id) ? 'icons/checked.png' : 'icons/add.png'}
                  alt='add'
                />
              </button>
              
              <button 
                style={isFavorite(keyboard.id) ? {backgroundColor: '#fa7373'} : {backgroundColor: '#d3d3d3'}}
                onClick={favoritesHandler}
                className={styles.fav}
              >
                <img
                  src='icons/add-favorite.png'
                  alt='heart'
                />
              </button>
            </div>}
          </div>
        </> :
        <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div>
      }
    </div>
  )
}

export default KeyboardCard
