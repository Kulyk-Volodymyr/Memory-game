import React, { useContext } from 'react';
import styles from './PlayGame.module.css';
import { GameContext } from '../context/GameContext';

export const PlayGame = () => {
    const {
        setPlayButton,
        level, setLevel, 
        setCardsOnBoard, 
        gameStatus,
        setFirstOpenedCardName,
        setFirstOpenedCardId, 
        setSecondOpenedCardId,       
        setMovesRemainder,
        setMovesRunningOut, 
        getImagesSet
    } = useContext(GameContext);

    const playButtonHandler = () => {
        setLevel(level);
        setCardsOnBoard(level);
        getImagesSet(level);
        setFirstOpenedCardName(null);
        setFirstOpenedCardId(null);
        setSecondOpenedCardId(null);
        setMovesRemainder(level * 3);
        setMovesRunningOut(false);

        setPlayButton(false);
    };

    return (
        <div className={styles.playGame}>
            <p className={styles.gameStatus}>{gameStatus}</p>
            <button onClick={() => playButtonHandler()} className={styles.playButton}>PLAY</button>
        </div>
    );
}
