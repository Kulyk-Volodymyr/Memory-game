import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const Moves = () => {
    const {
        level, 
        setMoves, 
        setMovesRemainder, 
        setTimeRemainder, 
        formatTime, 
        gameOver
    } = useContext(GameContext);

    /* Moves remainder handler - ../board/Board.jsx */

    const changingMovesValue = (value) => {
        setTimeRemainder(formatTime(level * 10));
        setMovesRemainder(level * 3);
        setMoves(value);

        gameOver('settings changed');
    }
    
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Moves:</legend>
            <div className={styles.buttons}>
                <input type="radio" name="moves" value={0} id="movesOn" 
                onChange={() => changingMovesValue(true)}
                />
                <label htmlFor="movesOn" className={styles.label}>ON</label>

                <input type="radio" name="moves" value={1} id="movesOff" 
                defaultChecked onChange={() => changingMovesValue(false)}
                />
                <label htmlFor="movesOff" className={styles.label}>OFF</label>
            </div>
        </fieldset>
    );
}
