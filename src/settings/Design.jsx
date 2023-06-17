import React from 'react';
import styles from './Settings.module.css';

export const Design = () => {
    function setColors(design) {
        switch (design) {
            case 'design1': // blue
                document.documentElement.style.setProperty('--bg-board', '#dddfea');
                document.documentElement.style.setProperty('--bg-card', '#5c59ae');
                document.documentElement.style.setProperty('--bg-settings', '#b5bae4');
                document.documentElement.style.setProperty('--border', '#28225b');
                break;
            case 'design2': // purple
                document.documentElement.style.setProperty('--bg-board', '#F1D4D4');
                document.documentElement.style.setProperty('--bg-card', '#713d7b');
                document.documentElement.style.setProperty('--bg-settings', '#c798b9');
                document.documentElement.style.setProperty('--border', '#452c4a');
                break;
            case 'design3': // green
                document.documentElement.style.setProperty('--bg-board', '#e1e6de');
                document.documentElement.style.setProperty('--bg-card', '#667b5e');
                document.documentElement.style.setProperty('--bg-settings', '#bdcab4');
                document.documentElement.style.setProperty('--border', '#314728');
                break;
            case 'design4': // brown
                document.documentElement.style.setProperty('--bg-board', '#fbe9cb');
                document.documentElement.style.setProperty('--bg-card', '#796d5b');
                document.documentElement.style.setProperty('--bg-settings', '#d0bd9f');
                document.documentElement.style.setProperty('--border', '#493e2e');
                break;
            case 'design5': // gray
                document.documentElement.style.setProperty('--bg-board', '#e0e2e4');
                document.documentElement.style.setProperty('--bg-card', '#626a6f');
                document.documentElement.style.setProperty('--bg-settings', '#b6bcc0');
                document.documentElement.style.setProperty('--border', '#313d4d');
                break;
            case 'design6': // black
                document.documentElement.style.setProperty('--bg-board', '#c0c0c0');
                document.documentElement.style.setProperty('--bg-card', '#4e4e4e');
                document.documentElement.style.setProperty('--bg-settings', '#8e8e8e');
                document.documentElement.style.setProperty('--border', '#3a3a3a');
                break;
        }
    }
    
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Design:</legend>
            <div className={styles.buttons}>
                <input type="radio" name="design" value={1} id="design1" defaultChecked // blue
                onChange={() => setColors('design1')}
                />
                <label htmlFor="design1" className={styles.label}>Blue</label>

                <input type="radio" name="design" value={2} id="design2" // purple
                onChange={() => setColors('design2')}
                />
                <label htmlFor="design2" className={styles.label}>Purple</label>

                <input type="radio" name="design" value={3} id="design3" // green
                onChange={() => setColors('design3')}
                />
                <label htmlFor="design3" className={styles.label}>Green</label>

                <input type="radio" name="design" value={4} id="design4" // brown
                onChange={() => setColors('design4')}
                />
                <label htmlFor="design4" className={styles.label}>Brown</label>

                <input type="radio" name="design" value={5} id="design5" // gray
                onChange={() => setColors('design5')}
                />
                <label htmlFor="design5" className={styles.label}>Gray</label>

                <input type="radio" name="design" value={6} id="design6" // black
                onChange={() => setColors('design6')}
                />
                <label htmlFor="design6" className={styles.label}>Black</label>
            </div>
        </fieldset>
    );
}
