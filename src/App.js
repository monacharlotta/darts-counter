import { useState } from 'react';
import './App.css';
import AddPlayers from './components/AddPlayers';

const App = () => {

  const [players, setPlayers] = useState([])

  const addPlayer = playerName => setPlayers([...players, playerName]);

  // Wait for two players to be added
  if (players.length !== 2) {
    return (
      <div className="App">
        <AddPlayers addPlayer={addPlayer} />
      </div>
    );
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
