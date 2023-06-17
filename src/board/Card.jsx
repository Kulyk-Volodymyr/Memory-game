import React, {useContext} from 'react';
import styles from './Card.module.css';
import {GameContext} from '../context/GameContext';


export const Card = (props) => {
  const {playButton, hidePairs, numberedCards} = useContext(GameContext);

  return (
    <div className={playButton ? `${styles.card} ${styles.cardTransparent}` : styles.card}>
      <div className={styles.cardWrapper}>

        <div 
        className={ 
          props.isVisible ? 
            (props.isOpen ? `${styles.cardContainer} ${styles.flipCard }` : styles.cardContainer) : 
            (hidePairs ? styles.cardInvisible : `${styles.cardContainer} ${styles.flipCard } ${styles.cardTransparent}`)
        } 
        onClick={props.onClick}
        >

          <div className={styles.cardFrontSide}>
            {numberedCards && 
              <p className={props.isVisible ? (props.isOpen ? styles.numberInvisible : styles.numberVisible) : styles.numberInvisible}>
                {props.id + 1}
              </p>
            }
          </div>

          <div className={props.isVisible ? styles.cardBackSide : `${styles.cardBackSide} ${styles.imageTransparent }`}>
            <div className={styles.cardBackSideImage} style={{ backgroundImage: `url(${props.image})`}}></div>
          </div>

        </div>

      </div>
    </div>
  );
}
