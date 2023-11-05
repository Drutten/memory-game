import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card/Card';

function App() {
  const [cards, setCards] = useState([]);

  
  const imageUrlBack = 'https://i.postimg.cc/NfykKYM0/back.png';

  useEffect(() => {
    const imageUrls = [
      'https://i.postimg.cc/sg3WzRtx/apple.png',
      'https://i.postimg.cc/WbLr9Z8M/cat.png',
      'https://i.postimg.cc/Hx8czW7Z/coffee.png',
      'https://i.postimg.cc/Rhr3Dr7M/dog.png',
      'https://i.postimg.cc/BQ0L50Zp/drink.png',
      'https://i.postimg.cc/1R6VNtS4/ferris-wheel.png',
    ]

    const randomize = (a, b) => {
      return Math.random() - 0.5;
    }

    const shuffleCards = (createdCards) => createdCards.sort(randomize);

    const createCards = () => {
      const createdCards = [];
      imageUrls.forEach((imageUrl, index) => {
        createdCards.push({imageUrl, imageId: index});
        createdCards.push({imageUrl, imageId: index});
      });
      setCards(shuffleCards(createdCards));
    }
    createCards();
  }, []);

  return (
    <div className='App'>
      <div className='game-area'>
        <h1>Memory Game</h1>
        <ul className='card-area'>
          {cards.map((card, index) => (
            <li key={index}>
              <Card card={card} imageUrlBack={imageUrlBack} />
            </li>
          ))}
        </ul>
        <button className='new-game'>New Game</button>
      </div>
    </div>
  );
}

export default App;
