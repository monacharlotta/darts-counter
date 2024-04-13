import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useContext, useState } from 'react';
import { DartsContext } from '../App';
import PlayerScores from "./PlayerScores";

const ScoreBoard = () => {
    
    const { initialScore, players } = useContext(DartsContext);
    const [player1Scores, setPlayer1Scores] = useState([]); 
    const [player1LegsWon, setPlayer1LegsWon] = useState(0); 
    const [player2Scores, setPlayer2Scores] = useState([]); 
    const [player2LegsWon, setPlayer2LegsWon] = useState(0); 

    const addPlayer1Score = value => addScore(value, player1Scores, setPlayer1Scores);
    const addPlayer2Score = value => addScore(value, player2Scores, setPlayer2Scores);
    const addScore = (value, scores, setScore) => {
        if (scores.length > 0 && scores[scores.length - 1].length < 3) {
            scores[scores.length - 1].push(value);
            setScore([...scores]);
        }
        else {
            setScore([...scores, [value]])
        }
    }

    return (
        <Container fluid="md" style={{ backgroundColor: 'Silver' }}>
            <Row style={{ borderStyle:'dashed'}}>
                <h1>Darts Counter - {initialScore} up</h1>
            </Row>
            <Row>
                <Col><PlayerScores scores={player1Scores} addScore={addPlayer1Score} wins={player1LegsWon}  playerName={players[0]} /></Col>
                <Col><PlayerScores scores={player2Scores} addScore={addPlayer2Score} wins={player2LegsWon} playerName={players[0]} /></Col>
            </Row>
        </Container>
    );
}

export default ScoreBoard;