import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const Timer = () => {
    const {
        level, 
        setMovesRemainder, 
        setGameWithTimer, 
        setTimeRemainder, 
        formatTime,
        gameOver
    } = useContext(GameContext);

    /* Time remainder handlers - ../board/Board.jsx and ../context/GameContext.jsx */

    const changingTimer = (value) => {
        setGameWithTimer(value);
        setTimeRemainder(formatTime(level * 10));
        setMovesRemainder(level * 3);

        gameOver('settings changed');
    }
    
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Timer:</legend>
            <div className={styles.buttons}>
                <input type="radio" name="timer" value={0} id="timerOn" 
                onChange={() => changingTimer(true)}
                />
                <label htmlFor="timerOn" className={styles.label}>ON</label>

                <input type="radio" name="timer" value={1} id="timerOff" 
                defaultChecked onChange={() => changingTimer(false)}
                />
                <label htmlFor="timerOff" className={styles.label}>OFF</label>
            </div>
        </fieldset>
    );
}
