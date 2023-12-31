import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Card from './components/card/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [successIds, setSuccessIds] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [isClickAllowed, setIsClickAllowed] = useState(true);
  const [firstCard, setFirstCard] = useState(null);

  const imageUrlBack = 'https://i.postimg.cc/NfykKYM0/back.png';
  const imageUrls = [
    'https://i.postimg.cc/sg3WzRtx/apple.png',
    'https://i.postimg.cc/WbLr9Z8M/cat.png',
    'https://i.postimg.cc/Hx8czW7Z/coffee.png',
    'https://i.postimg.cc/Rhr3Dr7M/dog.png',
    'https://i.postimg.cc/BQ0L50Zp/drink.png',
    'https://i.postimg.cc/1R6VNtS4/ferris-wheel.png',
  ]

  const shuffleCards = (createdCards) => {
    const array = [...createdCards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const createCards = () => {
    const createdCards = [];
    imageUrls.forEach((imageUrl, index) => {
      createdCards.push({
        id: uuidv4(),
        imageUrl,
        imageUrlBack,
        imageId: index,
        isOpen: false,
        isClickable: true,
      });
      createdCards.push({
        id: uuidv4(),
        imageUrl,
        imageUrlBack,
        imageId: index,
        isOpen: false,
        isClickable: true,
      });
    });
    setCards(shuffleCards(createdCards));
  }

  const startGame = () => {
    setSuccessIds([]);
    setTurnCount(0);
    setFirstCard(null);
    setIsClickAllowed(true);
    setGameStarted(true);
    createCards();
  }

  const selectCard = (currentCard) => {
    if (!isClickAllowed) return;
    setIsClickAllowed(false);
    let isMatch = false;

    if (firstCard) {
      if (firstCard.imageId === currentCard.imageId) {
        isMatch = true;
      } else {
        // no match
        const updatedFirstCard = {
          ...firstCard,
          isOpen: false,
          isClickable: true,
        };
        const updatedCurrentCard = {
          ...currentCard,
          isOpen: false,
        };
        setCards((cards) => cards.map((card) => {
          return card.id === currentCard.id ? {
            ...card,
            isOpen: true,
            isClickable: false,
          } : card
        }));
        setTimeout(() => {
          setTurnCount(turnCount + 1);
          setFirstCard(null);
          setIsClickAllowed(true);
          setCards((cards) => cards.map((card) => {
            let flippedBack = null;
            if (card.id === updatedFirstCard.id) {
              flippedBack = updatedFirstCard;
            }
            if (card.id === updatedCurrentCard.id) {
              flippedBack = updatedCurrentCard;
            }
            return flippedBack ? flippedBack : card;
          }));
        }, 1000);
      }
    } else {
      // current card is first card
      const updatedFirstCard = { ...currentCard, isOpen: true, isClickable: false };
      setFirstCard(updatedFirstCard);
      setIsClickAllowed(true);
      setCards((cards) => cards.map((card) =>
        card.id === updatedFirstCard.id ? updatedFirstCard : card,
      ));
    }
    if (isMatch) {
      const updatedSuccessIds = [...successIds, firstCard.id, currentCard.id];
      setTurnCount(turnCount + 1);
      if (updatedSuccessIds.length === cards.length) {
        // game is finished
        console.log(`Game finished in ${turnCount} turns`);
        setSuccessIds([]);
      } else {
        setSuccessIds(updatedSuccessIds);
      }
      setFirstCard(null);
      setIsClickAllowed(true);

      setCards((cards) => cards.map((card) => {
        return card.id === currentCard.id ? {
          ...card,
          isOpen: true,
          isClickable: false,
        } : card
      }));
    }
  }

  return (
    <div className='App'>
      <div className='game-area'>
        <h1>Memory Game</h1>

        {gameStarted && (
        <>
          <ul className='card-area'>
          {cards.map((card) => (
            <li key={card.id}>
              <Card card={card} selectCard={selectCard} />
            </li>
          ))}
          </ul>
          <button className='new-game' onClick={startGame}>New Game</button>
        </>)}

        {!gameStarted && <button className='main-game-button' onClick={startGame}>New Game</button>}
      </div>
    </div>
  );
}

export default App;
