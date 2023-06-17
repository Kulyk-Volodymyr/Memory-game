import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const Level = () => {
    const {
        setLevel, 
        setCardsOnBoard, 
        setMovesRemainder, 
        setTimeRemainder,  
        getImagesSet, 
        formatTime, 
        gameOver
    } = useContext(GameContext);

    const setBoardColumnWidth = (value) => {
        switch (value) {
            case 6:
            case 8:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '4'); 
                document.documentElement.style.setProperty('--columns-l', '4'); 
                break;
            case 10:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '5'); 
                document.documentElement.style.setProperty('--columns-l', '5'); 
                break;
            case 12:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '6'); 
                document.documentElement.style.setProperty('--columns-l', '6'); 
                break;
            case 15:
                document.documentElement.style.setProperty('--columns-s', '3'); 
                document.documentElement.style.setProperty('--columns-m', '5'); 
                document.documentElement.style.setProperty('--columns-l', '6'); 
                break;
            case 18:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '6'); 
                document.documentElement.style.setProperty('--columns-l', '6'); 
                break;   
            case 21:
                document.documentElement.style.setProperty('--columns-s', '3'); 
                document.documentElement.style.setProperty('--columns-m', '6'); 
                document.documentElement.style.setProperty('--columns-l', '7'); 
                break;
            case 24:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '6'); 
                document.documentElement.style.setProperty('--columns-l', '8'); 
                break;          
            case 28:
                document.documentElement.style.setProperty('--columns-s', '4'); 
                document.documentElement.style.setProperty('--columns-m', '7'); 
                document.documentElement.style.setProperty('--columns-l', '8'); 
                break;
        }
    };

    const changingTheLevel = (value) => {
        setBoardColumnWidth(value);
        setLevel(value);
        setCardsOnBoard(value);
        getImagesSet(value);
        setMovesRemainder(value * 3);
        setTimeRemainder(formatTime(value * 10));
        
        gameOver('settings changed');
    }
    
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Level <span style={{textTransform:'lowercase'}}>(pics)</span>:</legend>
            <div className={styles.buttons}>
                <input type="radio" name="level" value={6} id="level1" 
                onChange={() => changingTheLevel(6)}
                />
                <label htmlFor="level1" className={styles.label}>12</label>

                <input type="radio" name="level" value={8} id="level2" 
                onChange={() => changingTheLevel(8)}
                />
                <label htmlFor="level2" className={styles.label}>16</label>

                <input type="radio" name="level" value={10} id="level3" 
                defaultChecked onChange={() => changingTheLevel(10)}
                />
                <label htmlFor="level3" className={styles.label}>20</label>

                <input type="radio" name="level" value={12} id="level4" 
                onChange={() => changingTheLevel(12)}
                />
                <label htmlFor="level4" className={styles.label}>24</label>

                <input type="radio" name="level" value={15} id="level5" 
                onChange={() => changingTheLevel(15)}
                />
                <label htmlFor="level5" className={styles.label}>30</label>

                <input type="radio" name="level" value={18} id="level6" 
                onChange={() => changingTheLevel(18)}
                />
                <label htmlFor="level6" className={styles.label}>36</label>

                <input type="radio" name="level" value={21} id="level7" 
                onChange={() => changingTheLevel(21)}
                />
                <label htmlFor="level7" className={styles.label}>42</label>

                <input type="radio" name="level" value={24} id="level8" 
                onChange={() => changingTheLevel(24)}
                />
                <label htmlFor="level8" className={styles.label}>48</label>

                <input type="radio" name="level" value={28} id="level9" 
                onChange={() => changingTheLevel(28)}
                />
                <label htmlFor="level9" className={styles.label}>56</label>
            </div>
        </fieldset>
    );
}
