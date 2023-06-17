import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const HideThePairs = () => {
    const {setHidePairs} = useContext(GameContext);

    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Hide the pairs:</legend>
            <div className={styles.buttons}>
                <input type="radio" name="hidePairs" value={'showPairs'} id="showPairs" 
                defaultChecked onChange={() => setHidePairs(true)}
                />
                <label htmlFor="showPairs" className={styles.label}>ON</label>

                <input type="radio" name="hidePairs" value={'hidePairs'} id="hidePairs" 
                onChange={() => setHidePairs(false)}
                />
                <label htmlFor="hidePairs" className={styles.label}>OFF</label>
            </div>
        </fieldset>
    );
}
