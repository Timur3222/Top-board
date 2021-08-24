import { useState, useEffect } from 'react';
import KeyboardCard from '../components/KeyboardCard';

function Home({ keyboards, setCart, setFavorites, isLoaded }) {

const [input, setInput] = useState('');
const [sortingIncrease, setSortingIncrease] = useState(true);

useEffect(() => {sortedKeyboards()}, [sortingIncrease]);

const sortedKeyboards = () => {
  if (sortingIncrease) {
    return keyboards.sort((a, b) => a.price - b.price);
  } else {
    return keyboards.sort((a, b) => b.price - a.price);
  }
}

const searchHandler = (e) => {
  setInput(e.target.value);
}

const renderList = () => {
  return sortedKeyboards().filter(keyboard => 
    keyboard.title.toLowerCase().includes(input.toLowerCase())).map(keyboard => (
    <KeyboardCard
      key = {keyboard.id}
      keyboard = {keyboard}
      setCart = {setCart}
      setFavorites={setFavorites}
      isLoaded = {isLoaded}
    />
  ))
}

const renderFakeList = () => {
  return [...Array(9)].map(() => (
    <KeyboardCard
      isLoaded = {isLoaded}
    />
  ))
}

  return (
    <>
      <div className='search'>
        <div className="sorting-block">
          <h2>{input ? `Поиск по запросу: '${input}'` : 'Все клавиатуры'}</h2>
          <div className="sort">
            <span>Сортировка по {sortingIncrease ? 'возрастанию' : 'убыванию'} цены</span>
            <button onClick={() => setSortingIncrease(prev => !prev)}>
              <img src={sortingIncrease ? "icons/sorting.png" : "icons/sorting-rev.png"} alt="sorting" />
            </button>
          </div>
        </div>

        <div className="search-block">
          <img src="icons/search.png" alt="search" />
          <input value={input} onChange={searchHandler} type='text'  />
          {input && <img onClick={() => setInput('')} className='clear' src="icons/remove.png" alt="clear" />}
        </div>
      </div>

      <div className='keyboard-list'>
        {isLoaded ? renderList() : renderFakeList()}
      </div>
    </>
  )
}

export default Home