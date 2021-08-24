import { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';


function App() {
  
  const [keyboards, setKeyboards] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpened, setCartOpened] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  
  useEffect(() => {
    async function getData() {
      try {
        setisLoaded(false);

        const cartItems = await axios.get('http://localhost:3001/cart');
        const favoriteItems = await axios.get('http://localhost:3001/favorites');
        const items = await axios.get('http://localhost:3001/keyboards');

        setisLoaded(true);

        setCart(cartItems.data);
        setFavorites(favoriteItems.data);
        setKeyboards(items.data);
      } catch (error) {
          alert('Не удалось загрузить данные. Подождите и обновите страницу.')
      }
    }

    getData();
  }, []);

  const isAdded = (id) => {
    return cart.some(item => item.id === id);
  }

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  }

  const closeCart = () => {
    setCartOpened(false);
  }

  return (
    <AppContext.Provider value={{ cart, setCart, favorites, orders, setOrders, isAdded, isFavorite, closeCart }}>
      <div className="wrapper">

        <Header
          closeCart = {closeCart}
          clickCart = {() => setCartOpened(true)} 
        />

        <div className='list-wrapper'>
          <Route path={`${process.env.PUBLIC_URL}/`} exact>
            <Home
              keyboards = {keyboards}
              setCart = {setCart}
              setFavorites = {setFavorites}
              isLoaded = {isLoaded}
            />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/favorites`} exact>
            <Favorites
              favorites = {favorites}
              setFavorites = {setFavorites}
              setCart = {setCart}
              isLoaded = {isLoaded} 
            />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/orders`} exact>
            <Orders
              orders = {orders}
              isLoaded = {isLoaded} 
            />
          </Route>        

            <Cart
              isCartOpened = {isCartOpened}
              setCart ={setCart}
              isLoaded = {isLoaded}
            />     
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
