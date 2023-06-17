import './App.css';
import { Board } from './board/Board';
import { GameContextProvider } from './context/GameContext';
import { Control } from './control/Control';
import { Settings } from './settings/Settings';

function App() {
  return (
    <div className="App">
      <GameContextProvider >
        <Control />
        <Board />
        <Settings />
      </GameContextProvider>
    </div>
  );
}

export default App;
