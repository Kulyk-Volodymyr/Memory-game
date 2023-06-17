import React, {useContext} from 'react';
import styles from './Settings.module.css';
import {GameContext} from '../context/GameContext';

export const NumberedCards = () => {
  const { setNumberedCards } = useContext(GameContext);

  return (
    <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Numbered cards:</legend>
        <div className={styles.buttons}>
          <input type="radio" name="numberedCards" value={'numberedCardsOn'} id="numberedCardsOn" 
          onChange={() => setNumberedCards(true)}
          />
          <label htmlFor="numberedCardsOn" className={styles.label}>ON</label>

          <input type="radio" name="numberedCards" value={'numberedCardsOff'} id="numberedCardsOff" defaultChecked 
          onChange={() => setNumberedCards(false)}
          />
          <label htmlFor="numberedCardsOff" className={styles.label}>OFF</label>
        </div>
    </fieldset>
  );
}
