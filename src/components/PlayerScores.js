import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DartsContext } from "../App";

// Shows and manages the scores of a single player
const PlayerScores = ({ playerName, scores, addScore, wins, resetRound }) => {
    
    const { initialScore } = useContext(DartsContext); //The global DartsContext
    const [newScore, setNewScore] = useState(''); //The score to add

    // Calculates the current total score of this player
    const calculateTotalScore = () => scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

    // Calculates the remaining score for this player 
    const calculateRemaingScore = () => initialScore - calculateTotalScore();

    // Run when Add is clicked
    const HandleAdd = () => {
        const newValue = parseInt(newScore);
        if (newValue) {
            const diff = calculateRemaingScore() - newValue;
            if (diff !== 0 && diff <= 1) {
                // If adding this score would cause in a new remaining value that is less than or equal to 1 but NOT zero
                // --> reset the round and DON'T add it as we are "out of bounds"
                resetRound();
            }
            else {
                // Only add score if it does not go below zero or to 1
                // We come here if the score goes to exactly zero too :)
                addScore(newValue);
            }
            setNewScore(''); // reset new score field
        }
    }

    return (
        <>
            {/* Show player name and leg wins */}
            <div style={{ borderBottom: 'solid' }}>
                <h1>{playerName}</h1>
                <h3>Legs won: { wins }</h3>
            </div>

            {/* Input for score to add and button for executing addition */}
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: 'solid', padding: '5px'}}>
                <Form.Control min={0} type="number" value={newScore} onChange={e => setNewScore(e.target.value)} placeholder="Score" style={{ width: '25%', marginRight: '5px' }} />
                <Button onClick={HandleAdd} variant="light">Add</Button>
            </div>

            {
                // Loop over the rounds and print it in its own row
                scores.map((round, i) =>
                {
                    return (
                        <Row key={i} style={{ fontSize: 25 }}>
                            {
                                // Loop over the scores in a single round and print it in its own column
                                round.map((score, j) => <Col key={j}>{score}</Col>)
                            }
                        </Row>
                    );
                })
            }

            {/* Show stats */}
            <div style={{ borderTop: 'solid' }}>
                <h4>Total: {calculateTotalScore() }</h4>
                <h4>Remaining: {calculateRemaingScore()}</h4>
            </div>
            
        </>
    );
}

export default PlayerScores;