import { useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Setup from './components/Setup';

const App = () => {

  // Players
  const [players, setPlayers] = useState([])
  const [initialScore, setInitialScore] = useState(0); //Either 301 or 501 valid values

  return (
    <div className="App">
      {players.length !== 2 || initialScore === 0
        ? <Setup setPlayers={setPlayers} setInitialScore={setInitialScore} />
        : <ScoreBoard players={players} initialScore={initialScore} />
      }
    </div>
  );
}

export default App;
