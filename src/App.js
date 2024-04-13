import { createContext, useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Setup from './components/Setup';

export const DartsContext = createContext();

const App = () => {

  // Players
  const [players, setPlayers] = useState([])
  const [initialScore, setInitialScore] = useState(301); //Either 301 or 501 valid values
  const [setSize, setSetSize] = useState(9); //Default best of 9

  return (
    <div className="App">
      <DartsContext.Provider value={{ players, initialScore, setSize }}>
        { players.length !== 2 || initialScore === 0
          ? <Setup setPlayers={setPlayers} setInitialScore={setInitialScore} setSetSize={setSetSize} />
          : <ScoreBoard />
        }
      </DartsContext.Provider>
    </div>
  );
}

export default App;
