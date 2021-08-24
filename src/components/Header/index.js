import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import AppContext from '../../context';



function Header({ clickCart, closeCart }) {

  const { cart } = useContext(AppContext);

  const [navOpened, setNavOpened] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(prev => navOpened ? prev = true : prev = false);
  }, [navOpened])

  const summary = cart.reduce((summ, item) => {return summ + +item.price}, 0);

  return (
    <nav>
      <Link 
        to={`${process.env.PUBLIC_URL}/`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <header onClick={closeCart}>
          <h1>TOP BOARD</h1>
          <span>Магазин игровых клавиатур</span>
        </header>
      </Link>

      <ul className={navOpened ? styles.nav_active : styles.nav_links}>
        <li onClick={clickCart}>
          <img src='icons/cart.png' alt='cart' />
          <span>{cart.length ? `${summary} ₽` : '0 руб.'}</span>
        </li>

        <Link to={`${process.env.PUBLIC_URL}/favorites`}>
          <li onClick={closeCart}>
            <img src='icons/heart.png' alt='favorites' />
            <span>Избранное</span>
          </li>
        </Link>
        
        <Link to={`${process.env.PUBLIC_URL}/orders`}>
          <li onClick={closeCart}>
            <img src='icons/truck.png' alt='truck' />
            <span>Заказы</span>
          </li>
        </Link>
      </ul>
      <div onClick={() => setNavOpened(prev => !prev)} className={toggle ? styles.toggle : styles.button}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
    </nav>
  )
}

export default Header
