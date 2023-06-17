import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const Animation = () => {
    const {setAimationOn, setAimationTrue } = useContext(GameContext);

    const changeAnimation = (value) => {
        if (value == true) {
            document.documentElement.style.setProperty('--transition-duration', '0.6s');
        } else {
            document.documentElement.style.setProperty('--transition-duration', '0s');
        }
        setAimationOn(value);
        setAimationTrue(value);
    };
    
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Animation:</legend>
            <div className={styles.buttons}>   
                <input type="radio" name="animation" value={'animationOn'} id="animationOn" 
                onChange={() => changeAnimation(true)}
                />
                <label htmlFor="animationOn" className={styles.label}>ON</label>

                <input type="radio" name="animation" value={'animationOff'} id="animationOff" defaultChecked 
                onChange={() => changeAnimation(false)}
                />
                <label htmlFor="animationOff" className={styles.label}>OFF</label>
            </div>
        </fieldset>
    );
}
