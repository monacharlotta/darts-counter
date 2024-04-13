import { createContext, useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Setup from './components/Setup';

export const DartsContext = createContext(); //Context for easy passing of values to "grandchild"-components

const App = () => {

  // State
  const [players, setPlayers] = useState([]) // List of player names (max two)
  const [initialScore, setInitialScore] = useState(301); //Either 301 or 501 valid values
  const [setSize, setSetSize] = useState(9); //Default "best of 9"

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
