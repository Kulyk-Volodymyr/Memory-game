import React from 'react';
import styles from './Settings.module.css';
import { Level } from './Level';
import { Timer } from './Timer';
import { Moves } from './Moves';
import { HideThePairs } from './HideThePairs';
import { NumberedCards } from './NumberedCards';
import { Animation } from './Animation';
import { Design } from './Design';

export const Settings = () => {
  
  return (
    <div className={styles.settings}>
      <Level />
      <Moves />
      <Timer />
      <Animation />
      <HideThePairs />
      <NumberedCards />
      <Design />
    </div>
  );
}
