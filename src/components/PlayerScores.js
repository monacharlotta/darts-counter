import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DartsContext } from "../App";

const PlayerScores = ({ playerName, scores, addScore, wins }) => {
    
    const { initialScore } = useContext(DartsContext);
    const [newScore, setNewScore] = useState('');

    const calculateTotalScore = () => scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

    const calculateRemaingScore = () => initialScore - calculateTotalScore();

    const HandleAdd = () => {
        const newValue = parseInt(newScore);
        if (newValue) {
            addScore(newValue);
            setNewScore('');
        }
    }

    return (
        <>
            <div style={{ borderBottom: 'solid' }}>
                <h1>{playerName}</h1>
                <h3>Legs won: { wins }</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: 'solid', padding: '5px'}}>
                <Form.Control min={0} type="number" value={newScore} onChange={e => setNewScore(e.target.value)} placeholder="Score" style={{ width: '25%', marginRight: '5px' }} />
                <Button onClick={HandleAdd} variant="light">Add</Button>
            </div>

            {
                scores.map((round, i) =>
                {
                    return (
                        <Row key={i} style={{ fontSize: 25 }}>
                            {
                                round.map((score, j) => <Col key={j}>{score}</Col>)
                            }
                        </Row>
                    );
                })
            }
            <div style={{ borderTop: 'solid' }}>
                <h4>Total: {calculateTotalScore() }</h4>
                <h4>Remaining: {calculateRemaingScore()}</h4>
            </div>
            
        </>
    );
}

export default PlayerScores;