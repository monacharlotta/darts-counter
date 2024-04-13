import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useContext, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { DartsContext } from '../App';
import PlayerScores from "./PlayerScores";

const ScoreBoard = () => {
    
    const { initialScore, players } = useContext(DartsContext);
    const [player1Scores, setPlayer1Scores] = useState([]); 
    const [player1LegsWon, setPlayer1LegsWon] = useState(0); 
    const [player2Scores, setPlayer2Scores] = useState([]); 
    const [player2LegsWon, setPlayer2LegsWon] = useState(0); 

    // Toast 
    const [showToast, setShowToast] = useState(false); 
    const [toastBg, setToastBg] = useState('primary'); 
    const [toastMessage, setToastMessage] = useState(''); 
    const [toastHeader, setToastHeader] = useState(''); 

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

        checkWinner();
    }

    const resetPlayer1Round = () => resetRound(player1Scores, setPlayer1Scores);
    const resetPlayer2Round = () => resetRound(player2Scores, setPlayer2Scores);

    const resetRound = (playerScores, setScores) =>
    {
        if (playerScores.length > 0 && playerScores[playerScores.length - 1].length !== 3) {
            const resetScores = [...playerScores];
            resetScores.pop();
            setScores(resetScores);

            //TODO: Make user aware that this round was reset due to them going below zero or down to 1.
        }
    }

    // Find winner of leg, if any
    const checkWinner = () => {
        if (player1Scores.length > 0) {
            const remaining = initialScore - player1Scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

            if (remaining === 0) {
                setPlayer1LegsWon(player1LegsWon + 1);
                setToastBg('primary');
                setToastHeader('We have a leg winner!');
                setToastMessage(`${players[0]} won the leg!`)
                setShowToast(true);
                reset();
                return;
            }
        }

        if (player2Scores.length > 0) {
            const remaining = initialScore - player2Scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

            if (remaining === 0) {
                setPlayer2LegsWon(player2LegsWon + 1);
                setToastBg('primary');
                setToastHeader('We have a leg winner!');
                setToastMessage(`${players[1]} won the leg!`);
                setShowToast(true);
                reset();
                return;
            }
        }
    }

    // Reset all scores
    const reset = () => {
        setPlayer1Scores([]);
        setPlayer2Scores([]);

        // TODO: Check for set winner and make user aware using Toast message (see example in above method)

    }

    return (
        <Container fluid="md" style={{ backgroundColor: 'Silver' }}>
            <Row>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastBg}>
                    <Toast.Header>
                        {toastHeader}
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </Row>
            <Row style={{ borderStyle: 'dashed' }}>
                <h1>Darts Counter - {initialScore} up</h1>
            </Row>
            <Row>
                <Col><PlayerScores scores={player1Scores} addScore={addPlayer1Score} wins={player1LegsWon} resetRound={resetPlayer1Round} playerName={players[0]} /></Col>
                <Col><PlayerScores scores={player2Scores} addScore={addPlayer2Score} wins={player2LegsWon} resetRound={resetPlayer2Round} playerName={players[1]} /></Col>
            </Row>
        </Container>
    );
}

export default ScoreBoard;