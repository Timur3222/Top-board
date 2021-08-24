import { useContext } from "react";
import KeyboardCard from "../components/KeyboardCard";
import Information from '../components/Information';
import AppContext from '../context';

function Favorites({ setCart, setFavorites, isLoaded }) {
  
  const { favorites } = useContext(AppContext);

  const renderList = () => {
    return favorites.map(keyboard => (
      <KeyboardCard
        keyboard = {keyboard}
        key = {keyboard.id}
        setCart = {setCart}
        setFavorites = {setFavorites}
        isInCart = {false}
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

  return (
    <>
      <h2 className='favorites-title'>Избранное</h2>
      {favorites.length ?
      <div className="favorites-list">
        {isLoaded ? renderList() : renderFakeList()}
      </div> :
        <Information
          isInCart = {false}
          orderCheck = {false}
          isInFav = {true}
        />
      }
    </>
  )
}

export default Favorites
