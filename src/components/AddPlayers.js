import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

const AddPlayers = ({ addPlayer: addPlayerToState }) => {
    // State
    const [name, setName] = useState('');
    const [message, setMessage] = useState('Add two players!');

    const addPlayer = () => {
        if (name.length === 0) {
            setMessage('Please provide a name!');
        }
        else {
            addPlayerToState(name);
            setName('');
            setMessage(`Added ${name}!`);
        }        
    }
  return (
    <div>
        <label htmlFor="playerInput">Name: </label>
        <input type="text" name="playerInput" value={name} onChange={input => setName(input.target.value)} />
        <Button variant="outline-primary" onClick={addPlayer}>Add</Button>
        <p>{message}</p>
    </div>
  )
}

export default AddPlayers