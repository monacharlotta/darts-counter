import { useContext, useState } from 'react';
import { Toast } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { DartsContext } from '../App';
import PlayerScores from "./PlayerScores";

const ScoreBoard = () => {
    
    const { initialScore, players, setSize } = useContext(DartsContext);
    const [player1Scores, setPlayer1Scores] = useState([]);  // each scores array is to be a 2-d array where inner arrays are of max size 3 (3 darts per turn)
    const [player1LegsWon, setPlayer1LegsWon] = useState(0); // Keeps track of amount of leg wins
    const [player2Scores, setPlayer2Scores] = useState([]); 
    const [player2LegsWon, setPlayer2LegsWon] = useState(0); 

    // Toast 
    const [showToast, setShowToast] = useState(false); 
    const [toastBg, setToastBg] = useState('primary'); // Tip: Using "warning" for yellow toast message background and "danger" for red
    const [toastMessage, setToastMessage] = useState(''); 
    const [toastHeader, setToastHeader] = useState(''); 

    const addPlayer1Score = value => addScore(value, player1Scores, setPlayer1Scores); // Helper that performs score add for player 1
    const addPlayer2Score = value => addScore(value, player2Scores, setPlayer2Scores); // Helper that performs score add for player 2
    const addScore = (value, scores, setScore) => {
        // Check if the scores array is not empty and if the last inner array has a length less than 3 (then we want to add to it)
        if (scores.length > 0 && scores[scores.length - 1].length < 3) {
            scores[scores.length - 1].push(value); //Add the new value to the end of the current non-full inner scores array
            setScore([...scores]); //Update the scores
        }
        else {
            // We come here if either this is the first score we are adding OR if the last score added made last inner array full
            setScore([...scores, [value]]); // add the score to the players scores
        }

        // Check if we have a leg winner
        checkWinner();
    }

    const resetPlayer1Round = (wentBelow) => resetRound(player1Scores, setPlayer1Scores, wentBelow); // Helper method specific for resetting player 1 round
    const resetPlayer2Round = (wentBelow) => resetRound(player2Scores, setPlayer2Scores, wentBelow); // Helper method specific for resetting player 2 round

    const resetRound = (playerScores, setScores, wentBelow) => {
        // Check if scores array is not empty and the last inner scores array is not of length 3
        // If it is of length 3 it means that the score we entered (and did not add) would have been the first of the round
        if (playerScores.length > 0 && playerScores[playerScores.length - 1].length !== 3) {
            const resetScores = [...playerScores]; //Make a copy of the current scores array
            resetScores.pop(); //remove the whole last (current) round
            setScores(resetScores);  //Update the scores

            // Check if the reset was due to going below zero or down to 1, restarts the round and gives a notification
            if (wentBelow) {
                // Display toast notification
                setToastBg('warning');
                setToastHeader('Round Reset');
                setToastMessage('Round was reset due to going below zero or down to 1.');
                setShowToast(true);
        }
    }
}


    // Find winner of leg, if any
    const checkWinner = () => {
        // Check player 1
        if (player1Scores.length > 0) {
            // calculate how many points player 1 has remaining
            const remaining = initialScore - player1Scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

            if (remaining === 0) {
                // We come here if player 1 has won this round
                setPlayer1LegsWon(player1LegsWon + 1); //Increment leg wins

                // Set toast and show it
                setToastBg('primary');
                setToastHeader('We have a leg winner!');
                setToastMessage(`${players[0]} won the leg!`)
                setShowToast(true);

                //Reset scoreboard
                reset();
                return;
            }
        }

        // Check player 2
        if (player2Scores.length > 0) {
            // calculate how many points player 2 has remaining
            const remaining = initialScore - player2Scores.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr, 0), 0);

            if (remaining === 0) {
                // We come here if player 2 has won this round
                setPlayer2LegsWon(player2LegsWon + 1); //Increment leg wins

                // Set toast and show it
                setToastBg('primary');
                setToastHeader('We have a leg winner!');
                setToastMessage(`${players[1]} won the leg!`);
                setShowToast(true);

                //Reset scoreboard
                reset();
                return;
            }
        }

        // "Technically" both players could win on the same round and player 1 would then be named the winner (this function does not prevent it)
        // BUT this function is run once for every score added, and only one player's scores can be incremented at once --> so it is OK! :)
    }

    // Reset all scores arrays
    const reset = () => {
        setPlayer1Scores([]);
        setPlayer2Scores([]);

        // TODO: Check for set winner and make user aware using Toast message (see example in above method)
        // Use setSize variable for comparison (if one player has wins that is more than 50% of set size --> winner)

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