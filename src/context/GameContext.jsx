import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext(null);

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const imagesList = [
    'an_1', 'an_2', 'an_3', 'an_4', 'an_5', 'an_6', 'an_7',
    'an_8', 'ca_1', 'ca_2', 'ca_3', 'ca_4', 'ca_5', 'ca_6', 
    'df_1', 'df_2', 'df_3', 'df_4', 'df_5', 'pl_1', 'pl_2', 
    'pl_3', 'pl_4', 'pl_5', 'pl_6',  'pl_7', 'pl_8',  'pl_9'
];

const initialImagesSet = () => {
    shuffleArray(imagesList);
    let arrayForGame = [];
    for (let i = 0; i < 10; i++) arrayForGame.push(imagesList[i]);
    arrayForGame = [...arrayForGame, ...arrayForGame];
    shuffleArray(arrayForGame);
    let cardsArray = [];
    for (let i = 0; i < arrayForGame.length; i++) cardsArray.push(
        {
            id: i, 
            image: require(`../assets/${arrayForGame[i]}.png`), 
            name: arrayForGame[i],
            isOpen: false,
            isVisible: true
        }
    );
    return cardsArray;
};
  
export const GameContextProvider = (props) => {
    /* Start new game button - ../board/PlayGame.jsx */
    const [playButton, setPlayButton] = useState(true);
    /* Cards quantity - level * 2 */
    const [level, setLevel] = useState(10);
    /* How many cards are on the board - game over indicator  */
    const [cardsOnBoard, setCardsOnBoard] = useState(10);
    /* A set of images to start a new game */
    const [cards, setCards] = useState(initialImagesSet);
    /* Info about game over - ../PlayGame.jsx */
    const [gameStatus, setGameStatus] = useState(null);

    /* Clicks processing data - ../board/Board.jsx */
    const [firstOpenedCardName, setFirstOpenedCardName] = useState(null);
    const [firstOpenedCardId, setFirstOpenedCardId] = useState(null);
    const [secondOpenedCardId, setSecondOpenedCardId] = useState(null);

    /* Indicator of the number of moves - ../settings/Moves.jsx */
    const [moves, setMoves] = useState(false);
    /* Moves remainder info - ../settings/Level.jsx and ../control/Control.jsx */
    const [movesRemainder, setMovesRemainder] = useState(30);
    /* Less than 10 moves left - the counter turns red - ../control/Control.jsx */
    const [movesRunningOut, setMovesRunningOut] = useState(false);
    
    /* Play with time limitation - ../settings/Timer.jsx */
    const [gameWithTimer, setGameWithTimer] = useState(false);
    /* Time limitation value in seconds - ../settings/Level.jsx and ../control/Control.jsx */
    const [timeRemainder, setTimeRemainder] = useState([1, 40]);
    /* Start time counting after first click on the card - ../board/Board.jsx, Timer.jsx, Level.jsx */
    const [timerIsCounting, setTimerIsCounting] = useState(false);
    /* Less than 15 seconds left - the counter turns red - ../control/Control.jsx */
    const [timeRunningOut, setTimeRunningOut] = useState(false);

    /* The pair of the cards disappears or will be transparent - ../settings/HideThePairs.jsx */
    const [hidePairs, setHidePairs] = useState(true);
    /* Game with animation - ../settings/Animation.jsx */
    const [animationOn, setAimationOn] = useState(false);
    /* Game with animation - when time out - toggle transition-duration 
    to hide cards without animation ../board/PlayGame.jsx */
    const [animationTrue, setAimationTrue] = useState(false);
    /* Game with hint - numbered cards - ../settings/NumberedCards.jsx */
    const [numberedCards, setNumberedCards] = useState(false);

    /* New set of images for strarting a new game */
    const getImagesSet = (value) => {
        shuffleArray(imagesList);
        let arrayForGame = [];
        for (let i = 0; i < value; i++) arrayForGame.push(imagesList[i]);
        arrayForGame = [...arrayForGame, ...arrayForGame];
        shuffleArray(arrayForGame);
        let cardsArray = [];
        for (let i = 0; i < arrayForGame.length; i++) cardsArray.push(
            {
                id: i, 
                image: require(`../assets/${arrayForGame[i]}.png`), 
                name: arrayForGame[i],
                isOpen: false,
                isVisible: true
            }
        );
        setCards(cardsArray);
    };

    /* Less than 10 moves left - the counter turns red */
    useEffect(() => {
        if (movesRemainder == 10) setMovesRunningOut(true);
        if (movesRemainder == 0) setMovesRunningOut(false);
    }, [movesRemainder]);

    /* Start the timer after first click on the card - ../board/Board.jsx */
    useEffect(() => {
        let interval;
        let counter = timeRemainder[0] * 60 - 1;
        if (timeRemainder[1] != 0) counter += timeRemainder[1];

        if (timerIsCounting) {
            interval = setInterval(() => { 
                /* Less than 15 seconds left - the counter turns red */
                if (counter == 15 && timeRunningOut == false) {
                    setTimeRunningOut(true);
                }

                if (counter > 0) {
                    setTimeRemainder(formatTime(counter));
                    counter -= 1;
                } else {
                    clearInterval(interval);
                    setTimeRemainder(formatTime(level * 10));
                    setMovesRemainder(level * 3);
                    setMovesRunningOut(false);
                    
                    gameOver('player lost');
                }
            }, 1000);
        } else if (!timerIsCounting) {
            clearInterval(interval);
            setTimeRunningOut(false);
        }
        return () => clearInterval(interval);
    }, [timerIsCounting]);

    /* Format the time to display it in time control */
    function formatTime(value) {
        let time = [0, 0];
        if (value < 60) {
            value < 10 ? time[1] = `0${value}` : time[1] = value;
        } else {
            let minutes = Math.floor(value / 60);
            let seconds = value - minutes * 60;
            time[0] = minutes;
            seconds < 10 ? time[1] = `0${seconds}` : time[1] = seconds;
        }
        return time;
    }

    /* Game over handling:
        player wins; 
        player changed level or moves or timer;
        time is out;
        moves are over
    */
    function gameOver(gameOverInfo) {
        switch (gameOverInfo) {
            case 'settings changed':
                setGameStatus('You Changed the Settings');
                break;
            case 'player won':
                setGameStatus('You Win');
                break;
            case 'player lost':
                setGameStatus('You Lose');
                break;
        }
        setTimerIsCounting(false);
        setTimeRunningOut(false);
        setAimationOn(false);
        document.documentElement.style.setProperty('--transition-duration', '0s');

        setPlayButton(true);
    };
  
    const contextValue = {
        playButton, setPlayButton,
        level, setLevel,
        cardsOnBoard, setCardsOnBoard,
        cards, setCards,
        gameStatus,
        firstOpenedCardName, setFirstOpenedCardName,
        firstOpenedCardId, setFirstOpenedCardId, 
        secondOpenedCardId, setSecondOpenedCardId, 
        moves, setMoves,
        movesRemainder, setMovesRemainder,
        movesRunningOut, setMovesRunningOut, 
        gameWithTimer, setGameWithTimer,
        timeRemainder, setTimeRemainder,
        timerIsCounting, setTimerIsCounting,
        timeRunningOut, setTimeRunningOut,
        hidePairs, setHidePairs,
        animationOn, setAimationOn,
        animationTrue, setAimationTrue,
        numberedCards, setNumberedCards,
        
        getImagesSet, 
        formatTime, 
        gameOver
    };

  return (
    <GameContext.Provider value={contextValue}>
        {props.children}
    </GameContext.Provider>
  );
}
