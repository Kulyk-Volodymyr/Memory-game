import React, { useContext, useState } from 'react';
import styles from './Control.module.css';
import {GameContext} from '../context/GameContext';

export const Control = () => {
  const {
    moves, timeRunningOut, movesRemainder, gameWithTimer, timeRemainder, movesRunningOut,
  } = useContext(GameContext);

  return (
    <div className={styles.control}>
      {moves &&
        <div className={styles.moves}>
          <p>Moves:&nbsp;
            <span className={movesRunningOut ? styles.movesRemainderRed : styles.movesRemainder}>{movesRemainder}</span>
          </p>
        </div>
      }
      {gameWithTimer &&
        <div className={styles.timer}>
          <p>
            <span className={timeRunningOut ? styles.timeRemainderRed : styles.timeRemainder}>
              {timeRemainder[0]} : {timeRemainder[1]}
            </span>
          </p>
        </div>
      }
      <div></div>
    </div>
  );
}
