import React, { useContext, useEffect } from 'react';
import styles from './Board.module.css';
import { Card } from './Card';
import { GameContext } from '../context/GameContext';
import { PlayGame } from './PlayGame';

export const Board = () => {
  const {
    playButton, 
    level,
    cardsOnBoard, setCardsOnBoard,
    cards, setCards,
    firstOpenedCardName, setFirstOpenedCardName,
    firstOpenedCardId, setFirstOpenedCardId,
    secondOpenedCardId, setSecondOpenedCardId,
    moves, 
    movesRemainder, setMovesRemainder,
    setMovesRunningOut,
    gameWithTimer, 
    setTimeRemainder, 
    timerIsCounting, setTimerIsCounting, 
    animationOn, setAimationOn,
    animationTrue,
    formatTime, 
    gameOver
  } = useContext(GameContext);

  /* If moves limit is selected - ../settings/Moves.jsx */
  const movesRemainderHandler = () => {
    if (movesRemainder == 1) {
      setMovesRemainder(0);
      setTimeRemainder(formatTime(level * 10));

      gameOver('player lost');
    } else {
      setMovesRemainder((prev) => prev - 1)
    }
    
  };

  /* Flipp the card after click*/
  const flippTheCard = (id) => {
    const cardsAfterClick = [];
    for (let i = 0; i < cards.length; i++) {
      if (i != id) {
        cardsAfterClick.push(cards[i]);
      } else {
        const turnedOverCard = {...cards[i]};
        turnedOverCard.isOpen = !turnedOverCard.isOpen;
        cardsAfterClick.push(turnedOverCard);
      }
    }
    setCards(cardsAfterClick);
  }

  /* When the user clicked on the same card */
  const turnOverCard = (id) => {
    setFirstOpenedCardName(null);
    setFirstOpenedCardId(null);
    flippTheCard(id);
    //console.log('the card is turn over');
  }

  /* When the user didn't find a pair of cards */
  const turnOverCards = () => {
    const cardsAfterClick = [];
    for (let i = 0; i < cards.length; i++) {
      if (i != firstOpenedCardId && i != secondOpenedCardId) {
        cardsAfterClick.push(cards[i]);
      } else {
        const turnedOverCard = {...cards[i]};
        turnedOverCard.isOpen = !turnedOverCard.isOpen;
        cardsAfterClick.push(turnedOverCard);
      }
    }
    setCards(cardsAfterClick);
    setFirstOpenedCardName(null);
    setFirstOpenedCardId(null);
    setSecondOpenedCardId(null);
    //console.log('you didn\'t find the pair of cards');
  }

  /* When a pair of cards is found */
  const hideCards = (a) => {
    const cardsAfterClick = [];

    for (let i = 0; i < cards.length; i++) {
      if (i != firstOpenedCardId && i != a) {
        cardsAfterClick.push(cards[i]);
      } else {
        const turnedOverCard = {...cards[i]};
        turnedOverCard.isVisible = !turnedOverCard.isVisible;
        turnOverCard.isOpen = true;
        cardsAfterClick.push(turnedOverCard);
      }
    }
    setCards(cardsAfterClick);
    setFirstOpenedCardName(null);
    setFirstOpenedCardId(null);

    if (cardsOnBoard == 1) {
      setTimeRemainder(formatTime(level * 10));
      setMovesRemainder(level * 3 + 1);
      setMovesRunningOut(false);

      gameOver('player won');
    } else {
      setCardsOnBoard((prev) => prev - 1);
    }
    //console.log('you found the pair of cards');
  }

  /* MAIN EVENT - USER CLICKED ON THE CARD */
  const clickHandler = (name, id) => {
    if (gameWithTimer) { // if timer is ON - first click runs it
      if (!timerIsCounting) {
        setTimerIsCounting(true);
      }
    }

    if (!animationOn) { // // if animation is ON - first click runs it
      if (animationTrue) {
        setAimationOn(true);
        document.documentElement.style.setProperty('--transition-duration', '0.6s');
      }
    }

    if (secondOpenedCardId != null) { // click on the card when two other are already open
      turnOverCards();
    } else { // none or one card is open
      if (firstOpenedCardName === null) { // no cards are open
        setFirstOpenedCardName(name);
        setFirstOpenedCardId(id);
        flippTheCard(id);
      } else if (firstOpenedCardId === id) { // clicked on the same card
        turnOverCard(id);
        moves && movesRemainderHandler();
      } else { // second card openning
        if (name === firstOpenedCardName) { // pair found
          hideCards(id);
        } else { // pair not found
          setSecondOpenedCardId(id);
          flippTheCard(id);
        }
        moves && movesRemainderHandler();
      }
    }
  }

  return (
    <div className={styles.board}>
      {playButton && <PlayGame />}
      <div className={styles.cardsContainer}>
        {cards.map(i => 
          <Card 
            id={i.id} 
            image={i.image} 
            key={i.id} 
            onClick={() => clickHandler(i.name, i.id)} 
            name={i.name} 
            isOpen={i.isOpen} 
            isVisible={i.isVisible}
          />
        )}
      </div>
    </div>
  );
}
